#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const force = args.has('--force');

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'public', 'assets', 'brand');
const manifestPath = path.join(projectRoot, '.cloudinary-upload-manifest.json');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.');
  process.exit(1);
}

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.mov', '.mp4', '.m4v']);

function inferResourceType(ext) {
  if (ext === '.mov' || ext === '.mp4' || ext === '.m4v') {
    return 'video';
  }
  return 'image';
}

function createSignature(params, secret) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${payload}${secret}`).digest('hex');
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

async function uploadFile(filePath) {
  const relative = path.relative(sourceRoot, filePath).split(path.sep).join('/');
  const ext = path.extname(relative).toLowerCase();
  const basename = relative.slice(0, -ext.length);
  const resourceType = inferResourceType(ext);
  const publicId = basename;
  const timestamp = Math.floor(Date.now() / 1000);

  const signParams = {
    folder: 'assets/brand',
    invalidate: 'true',
    overwrite: 'true',
    public_id: publicId,
    timestamp: String(timestamp)
  };

  const signature = createSignature(signParams, apiSecret);
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  const fileBuffer = await fs.readFile(filePath);

  const form = new FormData();
  form.append('file', new Blob([fileBuffer]), path.basename(filePath));
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('public_id', publicId);
  form.append('folder', 'assets/brand');
  form.append('overwrite', 'true');
  form.append('invalidate', 'true');
  form.append('signature', signature);

  const res = await fetch(endpoint, {
    method: 'POST',
    body: form
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Upload failed for ${relative}: ${res.status} ${body}`);
  }

  const json = await res.json();
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
