#!/usr/bin/env node

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { v2 as cloudinary } from 'cloudinary';

const execFileAsync = promisify(execFile);

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const force = args.has('--force');

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'public', 'assets', 'brand');
const manifestPath = path.join(projectRoot, '.cloudinary-upload-manifest.json');
const tempRoot = path.join(projectRoot, '.cloudinary-temp');
const MAX_CLOUDINARY_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_CLOUDINARY_VIDEO_BYTES = 100 * 1024 * 1024;
const TARGET_VIDEO_BYTES = 95 * 1024 * 1024;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.mov', '.mp4', '.m4v']);

function inferResourceType(ext) {
  if (ext === '.mov' || ext === '.mp4' || ext === '.m4v') {
    return 'video';
  }
  return 'image';
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (entry.name === '.DS_Store') {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function readManifest() {
  try {
    const text = await fs.readFile(manifestPath, 'utf8');
    return JSON.parse(text);
  } catch {
    return {};
  }
}

async function writeManifest(manifest) {
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

async function getMediaDuration(filePath) {
  const { stdout } = await execFileAsync('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    filePath
  ]);

  return Number(stdout.trim());
}

async function ensureCloudinaryReadyVideo(filePath, publicId) {
  const stat = await fs.stat(filePath);

  if (stat.size <= MAX_CLOUDINARY_VIDEO_BYTES) {
    return { uploadPath: filePath, cleanupPath: undefined };
  }

  await fs.mkdir(tempRoot, { recursive: true });

  const durationSeconds = await getMediaDuration(filePath);
  const bitrateKbps = Math.max(2500, Math.floor((TARGET_VIDEO_BYTES * 8 * 0.92) / Math.max(durationSeconds, 1) / 1000));
  const maxrateKbps = Math.floor(bitrateKbps * 1.1);
  const bufsizeKbps = maxrateKbps * 2;
  const tempPath = path.join(tempRoot, `${publicId}.mp4`);

  console.log(`   source video exceeds Cloudinary Free limit; transcoding to ${bitrateKbps}k MP4 for upload`);

  await execFileAsync('ffmpeg', [
    '-y',
    '-i',
    filePath,
    '-vf',
    'scale=1280:-2:force_original_aspect_ratio=decrease',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-pix_fmt',
    'yuv420p',
    '-profile:v',
    'high',
    '-level',
    '4.1',
    '-movflags',
    '+faststart',
    '-an',
    '-b:v',
    `${bitrateKbps}k`,
    '-maxrate',
    `${maxrateKbps}k`,
    '-bufsize',
    `${bufsizeKbps}k`,
    tempPath
  ]);

  const tempStat = await fs.stat(tempPath);
  if (tempStat.size > MAX_CLOUDINARY_VIDEO_BYTES) {
    throw new Error(`Transcoded video is still too large for Cloudinary Free (${tempStat.size} bytes).`);
  }

  return { uploadPath: tempPath, cleanupPath: tempPath };
}

async function ensureCloudinaryReadyImage(filePath, publicId) {
  const stat = await fs.stat(filePath);

  if (stat.size <= MAX_CLOUDINARY_IMAGE_BYTES) {
    return { uploadPath: filePath, cleanupPath: undefined };
  }

  await fs.mkdir(tempRoot, { recursive: true });

  const tempPath = path.join(tempRoot, `${publicId}.jpg`);

  console.log('   source image exceeds Cloudinary Free limit; transcoding to JPEG for upload');

  await execFileAsync('ffmpeg', [
    '-y',
    '-i',
    filePath,
    '-vf',
    'scale=2560:-2:force_original_aspect_ratio=decrease',
    '-q:v',
    '2',
    tempPath
  ]);

  const tempStat = await fs.stat(tempPath);
  if (tempStat.size > MAX_CLOUDINARY_IMAGE_BYTES) {
    throw new Error(`Transcoded image is still too large for Cloudinary Free (${tempStat.size} bytes).`);
  }

  return { uploadPath: tempPath, cleanupPath: tempPath };
}

async function uploadFile(filePath) {
  const relative = path.relative(sourceRoot, filePath).split(path.sep).join('/');
  const ext = path.extname(relative).toLowerCase();
  const basename = relative.slice(0, -ext.length);
  const resourceType = inferResourceType(ext);
  const publicId = basename;
  const preparedAsset =
    resourceType === 'video'
      ? await ensureCloudinaryReadyVideo(filePath, publicId)
      : await ensureCloudinaryReadyImage(filePath, publicId);
  const uploadPath = preparedAsset.uploadPath;
  const options = {
    resource_type: resourceType,
    folder: 'assets/brand',
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    chunk_size: 6 * 1024 * 1024
  };

  const json = await cloudinary.uploader.upload(uploadPath, options);

  if (preparedAsset.cleanupPath) {
    await fs.rm(preparedAsset.cleanupPath, { force: true });
  }

  return {
    relative,
    resourceType,
    secureUrl: json.secure_url,
    publicId: json.public_id,
    version: json.version
  };
}

async function main() {
  const allFiles = await collectFiles(sourceRoot);
  const manifest = await readManifest();
  const nextManifest = { ...manifest };

  let uploaded = 0;
  let skipped = 0;

  console.log(`Preparing to upload ${allFiles.length} files from public/assets/brand`);

  for (const absolutePath of allFiles) {
    const stat = await fs.stat(absolutePath);
    const relative = path.relative(sourceRoot, absolutePath).split(path.sep).join('/');
    const fingerprint = `${stat.size}:${Math.floor(stat.mtimeMs)}`;

    if (!force && manifest[relative] === fingerprint) {
      skipped += 1;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] would upload ${relative}`);
      nextManifest[relative] = fingerprint;
      uploaded += 1;
      continue;
    }

    console.log(`Uploading ${relative}`);
    const result = await uploadFile(absolutePath);
    console.log(` -> ${result.secureUrl}`);

    nextManifest[relative] = fingerprint;
    uploaded += 1;
  }

  if (!dryRun) {
    await writeManifest(nextManifest);
  }

  console.log(`Done. Uploaded: ${uploaded}, Skipped: ${skipped}, Dry-run: ${dryRun}`);
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
