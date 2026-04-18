import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { slugify } from '@/lib/utils';
import type { GalleryInput, GalleryItem } from '@/lib/types';

const dataFile = path.join(process.cwd(), 'data', 'gallery.json');

export type GalleryStorageMode = 'local' | 'manual';

export function getGalleryStorageMode(): GalleryStorageMode {
  if (process.env.NODE_ENV === 'production') {
    return 'manual';
  }

  return 'local';
}

export function getGalleryStorageInfo() {
  const mode = getGalleryStorageMode();

  return {
    mode,
    canWriteFromAdmin: mode === 'local',
    requiresManualAssets: mode === 'manual',
    description:
      mode === 'local'
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

export async function saveGalleryUpload(file: File) {
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
  return readLocalItems();
}

export async function readGalleryTags() {
  const items = await readGalleryItems();
  return Array.from(new Set(items.flatMap((item) => item.tags))).sort((left, right) => left.localeCompare(right));
}

export async function appendGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  if (getGalleryStorageMode() === 'manual') {
    throw new Error('Manual gallery mode is active in production. Commit new assets and data/gallery.json changes through code instead of the admin uploader.');
  }

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
  await writeLocalItems(nextItems);
  return nextItem;
}
