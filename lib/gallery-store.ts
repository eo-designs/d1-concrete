import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { del, list, put } from '@vercel/blob';
import { slugify } from '@/lib/utils';
import type { GalleryInput, GalleryItem } from '@/lib/types';

const dataFile = path.join(process.cwd(), 'data', 'gallery.json');
const manifestPath = 'gallery/manifest.json';

export type GalleryStorageMode = 'local' | 'manual' | 'blob';

export function getGalleryStorageMode(): GalleryStorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return 'blob';
  }

  if (process.env.NODE_ENV === 'production') {
    return 'manual';
  }

  return 'local';
}

export function getGalleryStorageInfo() {
  const mode = getGalleryStorageMode();

  return {
    mode,
    canWriteFromAdmin: mode === 'blob' || mode === 'local',
    requiresManualAssets: mode === 'manual',
    description:
      mode === 'blob'
        ? 'Uploads are stored in Vercel Blob and gallery metadata is persisted in a blob manifest.'
        : mode === 'local'
          ? 'Uploads are written to local files for development and gallery metadata is stored in data/gallery.json.'
          : 'Production is running in manual mode. Add images under public/assets/gallery and commit updates to data/gallery.json.'
  };
}

async function ensureDataFile() {
  const dir = path.dirname(dataFile);
  await mkdir(dir, { recursive: true });
}

async function readLocalItems(): Promise<GalleryItem[]> {
  try {
    const raw = await readFile(dataFile, 'utf8');
    const parsed = JSON.parse(raw) as { items?: GalleryItem[] };
    return (parsed.items || []).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  } catch {
    return [];
  }
}

async function writeLocalItems(items: GalleryItem[]) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify({ items }, null, 2));
}

async function readBlobItems(): Promise<GalleryItem[]> {
  const result = await list({ prefix: manifestPath, limit: 10 });
  const manifest = result.blobs.find((blob) => blob.pathname === manifestPath);

  if (!manifest) {
    return [];
  }

  const response = await fetch(manifest.url, { cache: 'no-store' });

  if (!response.ok) {
    return [];
  }

  const parsed = (await response.json()) as { items?: GalleryItem[] };
  return (parsed.items || []).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

async function writeBlobItems(items: GalleryItem[]) {
  const existing = await list({ prefix: manifestPath, limit: 10 });
  const currentManifest = existing.blobs.find((blob) => blob.pathname === manifestPath);

  if (currentManifest) {
    await del(currentManifest.url);
  }

  await put(manifestPath, JSON.stringify({ items }, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
}

export async function saveGalleryUpload(file: File) {
  if (getGalleryStorageMode() === 'blob') {
    const extension = path.extname(file.name) || '.jpg';
    const fileName = `${Date.now()}-${slugify(path.basename(file.name, extension))}${extension}`;
    const blob = await put(`gallery/uploads/${fileName}`, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type || undefined
    });

    return blob.url;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || '.jpg';
  const fileName = `${Date.now()}-${slugify(path.basename(file.name, extension))}${extension}`;
  const outputDir = path.join(process.cwd(), 'public', 'assets', 'gallery');
  const outputPath = path.join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, buffer);

  return `/assets/gallery/${fileName}`;
}

export async function readGalleryItems(): Promise<GalleryItem[]> {
  if (getGalleryStorageMode() === 'blob') {
    return readBlobItems();
  }

  return readLocalItems();
}

export async function readGalleryTags() {
  const items = await readGalleryItems();
  return Array.from(new Set(items.flatMap((item) => item.tags))).sort((left, right) => left.localeCompare(right));
}

export async function appendGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  const items = await readGalleryItems();
  const createdAt = new Date().toISOString();
  const id = `${slugify(input.title)}-${Date.now()}`;

  const nextItem: GalleryItem = {
    ...input,
    id,
    createdAt,
    tags: Array.from(new Set(input.tags.map((tag) => slugify(tag)).filter(Boolean)))
  };

  const nextItems = [nextItem, ...items];

  if (getGalleryStorageMode() === 'blob') {
    await writeBlobItems(nextItems);
    return nextItem;
  }

  if (getGalleryStorageMode() === 'manual') {
    throw new Error('Manual gallery mode is active in production. Commit new assets and data/gallery.json changes through code instead of the admin uploader.');
  }

  await writeLocalItems(nextItems);
  return nextItem;
}