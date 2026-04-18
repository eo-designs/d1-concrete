#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const projectRoot = process.cwd();
const args = process.argv.slice(2);
const manifestPath = path.join(projectRoot, '.blob-upload-manifest.json');
const execFileAsync = promisify(execFile);

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function normalizePosixPath(input) {
  return input.split(path.sep).join('/').replace(/^\/+/, '');
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function loadManifest() {
  const raw = await fs.readFile(manifestPath, 'utf8').catch(() => '');

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function buildFingerprint(fileStat) {
  return `${fileStat.size}:${Math.trunc(fileStat.mtimeMs)}`;
}

async function putWithVercelCli({ filePath, pathname, token }) {
  const cliArgs = [
    'blob',
    'put',
    filePath,
    '--access',
    'public',
    '--allow-overwrite',
    '--multipart',
    '--pathname',
    pathname,
    '--rw-token',
    token
  ];

  const { stdout, stderr } = await execFileAsync('vercel', cliArgs, {
    cwd: projectRoot,
    maxBuffer: 10 * 1024 * 1024
  });

  const output = `${stdout}\n${stderr}`;
  const urlMatch = output.match(/https:\/\/[^\s]+\.public\.blob\.vercel-storage\.com\/[^\s]+/);

  return {
    url: urlMatch ? urlMatch[0] : null,
    output
  };
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('Missing BLOB_READ_WRITE_TOKEN. Set it in your shell or .env.local before running.');
    process.exit(1);
  }

  const sourceDirArg = getArg('source', 'public/assets');
  const blobPrefixArg = getArg('prefix', 'assets');
  const maxSizeMbArg = Number(getArg('max-size-mb', '800'));
  const dryRun = args.includes('--dry-run');

  if (Number.isNaN(maxSizeMbArg) || maxSizeMbArg <= 0) {
    console.error('Invalid --max-size-mb value. Use a positive number.');
    process.exit(1);
  }

  const sourceDir = path.resolve(projectRoot, sourceDirArg);
  const blobPrefix = normalizePosixPath(blobPrefixArg);
  const maxSizeBytes = maxSizeMbArg * 1024 * 1024;

  const stat = await fs.stat(sourceDir).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = await walkFiles(sourceDir);
  const manifest = await loadManifest();
  let skippedCount = 0;
  let skippedLargeCount = 0;
  let uploadCount = 0;

  if (files.length === 0) {
    console.log(`No files found under ${sourceDir}`);
    return;
  }

  console.log(`Preparing to upload ${files.length} files from ${sourceDirArg} to Blob prefix ${blobPrefix}`);

  for (const filePath of files) {
    const relative = normalizePosixPath(path.relative(sourceDir, filePath));

    if (relative.endsWith('.DS_Store')) {
      skippedCount += 1;
      continue;
    }

    const pathname = normalizePosixPath(path.posix.join(blobPrefix, relative));
    const fileStat = await fs.stat(filePath);

    if (fileStat.size > maxSizeBytes) {
      skippedCount += 1;
      skippedLargeCount += 1;
      const sizeMb = (fileStat.size / 1024 / 1024).toFixed(1);
      console.log(`Skipping large file (${sizeMb} MB > ${maxSizeMbArg} MB): ${relative}`);
      continue;
    }

    const fingerprint = buildFingerprint(fileStat);

    if (manifest[pathname] === fingerprint) {
      skippedCount += 1;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] ${filePath} -> ${pathname} (new/changed)`);
      uploadCount += 1;
      continue;
    }

    const result = await putWithVercelCli({ filePath, pathname, token });

    manifest[pathname] = fingerprint;
    uploadCount += 1;

    if (result.url) {
      console.log(`${pathname} -> ${result.url}`);
    } else {
      console.log(`${pathname} -> uploaded`);
      if (result.output?.trim()) {
        console.log(result.output.trim());
      }
    }
  }

  if (!dryRun) {
    await saveManifest(manifest);
  }

  if (dryRun) {
    console.log(`Dry run complete. ${uploadCount} file(s) would upload, ${skippedCount} skipped (${skippedLargeCount} large).`);
  } else {
    console.log(`Upload complete. ${uploadCount} uploaded, ${skippedCount} skipped (${skippedLargeCount} large).`);
  }
}

main().catch((error) => {
  if (error?.stderr) {
    console.error(String(error.stderr));
  } else if (error?.message) {
    console.error(String(error.message));
  } else {
    console.error(error);
  }
  process.exit(1);
});
