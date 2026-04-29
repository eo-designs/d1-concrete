'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import type { GalleryItem } from '@/lib/types';
import type { GalleryStorageMode } from '@/lib/gallery-store';

type SessionState = 'loading' | 'authenticated' | 'anonymous';

type StorageInfo = {
  mode: GalleryStorageMode;
  canWriteFromAdmin: boolean;
  requiresManualAssets: boolean;
  description: string;
};

export function AdminPanel({ initialItems, initialTags, initialStorage }: { initialItems: GalleryItem[]; initialTags: string[]; initialStorage: StorageInfo }) {
  const [session, setSession] = useState<SessionState>('loading');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [items, setItems] = useState(initialItems);
  const [tags, setTags] = useState(initialTags);
  const [storage, setStorage] = useState(initialStorage);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((response) => response.json())
      .then((payload: { authenticated: boolean }) => {
        setSession(payload.authenticated ? 'authenticated' : 'anonymous');
      })
      .catch(() => setSession('anonymous'));
  }, []);

  async function refreshGallery() {
    const response = await fetch('/api/gallery', { cache: 'no-store' });
    const payload = (await response.json()) as { items: GalleryItem[]; tags: string[]; storage: StorageInfo };
    setItems(payload.items);
    setTags(payload.tags);
    setStorage(payload.storage);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Checking password...');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setStatus('Login failed. Check ADMIN_PASSWORD in your server environment.');
      return;
    }

    setPassword('');
    setSession('authenticated');
    setStatus('Logged in. You can upload to the gallery now.');
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setSession('anonymous');
    setStatus('Logged out.');
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('Uploading image and saving metadata...');

    const response = await fetch('/api/gallery', {
      method: 'POST',
      body: formData
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus(payload.error || 'Upload failed.');
      return;
    }

    event.currentTarget.reset();
    await refreshGallery();
    setStatus('Gallery updated. Refresh the public gallery page to review the new image.');
  }

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="panel p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-semibold">Gallery Admin</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7">This admin entry is safe from client-side secret leakage because the password is checked inside a Next.js route handler and stored in an httpOnly cookie. {storage.description}</p>
            </div>
            {session === 'authenticated' ? (
              <button type="button" onClick={handleLogout} className="rounded-full border border-steel/20 px-4 py-2 text-sm font-semibold text-ink transition hover:border-steel/40 hover:text-clay">
                Log Out
              </button>
            ) : null}
          </div>
          <div className="mt-4 inline-flex rounded-full border border-steel/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
            Storage mode: {storage.mode}
          </div>
          <div className="mt-4 text-sm font-medium text-clay">{status}</div>
        </div>
      </Reveal>

      {session !== 'authenticated' ? (
        <Reveal>
          <form onSubmit={handleLogin} className="panel max-w-lg space-y-4 p-6 md:p-8">
            <label className="block text-sm font-semibold text-ink">
              Admin password
              <input type="password" className="field mt-2" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit" className="rounded-full bg-clay px-5 py-3 text-sm font-semibold text-white transition hover:bg-metallic">
              Enter Admin
            </button>
          </form>
        </Reveal>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          {storage.canWriteFromAdmin ? (
            <Reveal>
              <form onSubmit={handleUpload} className="panel space-y-4 p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-ink">Upload New Project</h3>
                <label className="block text-sm font-semibold text-ink">
                  Project title
                  <input name="title" required className="field mt-2" placeholder="Downtown storefront flatwork" />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-ink">
                    Category
                    <select name="category" className="field mt-2" defaultValue="residential">
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </label>
                  <label className="block text-sm font-semibold text-ink">
                    Location
                    <input name="location" required className="field mt-2" placeholder="Project city, CA" />
                  </label>
                </div>
                <label className="block text-sm font-semibold text-ink">
                  Project scope
                  <textarea name="scope" required className="field mt-2 min-h-28" placeholder="Stamped patio replacement with sawcut borders and integrated drainage." />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Alt text
                  <input name="alt" required className="field mt-2" placeholder="Freshly finished commercial slab with sawcut joints" />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Tags
                  <input name="tags" list="gallery-tags" className="field mt-2" placeholder="stamped, patio, backyard, broom-finish" />
                  <datalist id="gallery-tags">
                    {tags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Image file
                  <input name="file" type="file" accept="image/*" className="field mt-2" />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Or hosted image URL
                  <input name="imageUrl" className="field mt-2" placeholder="https://... or /assets/gallery/your-file.jpg" />
                </label>
                <button type="submit" className="rounded-full bg-clay px-5 py-3 text-sm font-semibold text-white transition hover:bg-metallic">
                  Save Gallery Item
                </button>
              </form>
            </Reveal>
          ) : (
            <Reveal>
              <div className="panel space-y-4 p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-ink">Manual Gallery Workflow</h3>
                <p className="text-sm leading-7">In production manual mode, image and metadata updates are intentionally handled through code commits instead of runtime writes.</p>
                <div className="rounded-3xl border border-steel/20 bg-white/70 p-5 text-sm leading-7 text-ink">
                  1. Add image files under <span className="font-semibold">public/assets/gallery</span>.<br />
                  2. Add the new item and tags in <span className="font-semibold">data/gallery.json</span>.<br />
                  3. Push to Git and let Vercel deploy.
                </div>
                <p className="text-sm leading-7">Brand media (hero and homepage gallery) is served from local assets in development and can use Cloudinary URLs in production.</p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <div className="panel p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-ink">Current Gallery Items</h3>
              <div className="mt-5 space-y-3">
                {items.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.03}>
                    <div className="rounded-3xl border border-steel/20 bg-white/70 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-base font-semibold text-ink">{item.title}</div>
                          <div className="mt-1 text-sm">{item.location}</div>
                        </div>
                        <div className="rounded-full bg-steel/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone">{item.category}</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}