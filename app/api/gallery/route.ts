import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getCookieName, verifySessionValue } from '@/lib/auth';
import { appendGalleryItem, getGalleryStorageInfo, readGalleryItems, readGalleryTags, saveGalleryUpload } from '@/lib/gallery-store';
import type { ProjectCategory } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const [items, tags] = await Promise.all([readGalleryItems(), readGalleryTags()]);
  return NextResponse.json({ items, tags, storage: getGalleryStorageInfo() });
}

export async function POST(request: Request) {
  const isAuthenticated = verifySessionValue(cookies().get(getCookieName())?.value);
  const storage = getGalleryStorageInfo();

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || 'residential') as ProjectCategory;
  const location = String(formData.get('location') || '').trim();
  const scope = String(formData.get('scope') || '').trim();
  const alt = String(formData.get('alt') || '').trim();
  const imageUrl = String(formData.get('imageUrl') || '').trim();
  const tagsInput = String(formData.get('tags') || '');
  const file = formData.get('file');

  if (!storage.canWriteFromAdmin) {
    return NextResponse.json(
      {
        error: 'Admin uploads are disabled in production manual mode. Add files to public/assets/gallery and commit data/gallery.json changes.'
      },
      { status: 400 }
    );
  }

  if (!title || !location || !scope || !alt) {
    return NextResponse.json({ error: 'Title, location, scope, and alt text are required.' }, { status: 400 });
  }

  let image = imageUrl;

  if (file instanceof File && file.size > 0) {
    image = await saveGalleryUpload(file);
  }

  if (!image) {
    return NextResponse.json({ error: 'Provide either an image file or a hosted image URL.' }, { status: 400 });
  }

  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  try {
    const item = await appendGalleryItem({
      title,
      category,
      location,
      scope,
      alt,
      image,
      tags
    });

    return NextResponse.json({ item, storage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save gallery item.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}