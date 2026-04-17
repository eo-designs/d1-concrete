# D1 Concrete

Marketing site and server-ready Next.js UI for D1 Concrete.

## Run locally

1. Install dependencies with `npm install`
2. Create `.env.local`
3. Start the dev server with `npm run dev`

## Environment variables

```bash
ADMIN_PASSWORD=replace-with-a-strong-password
AUTH_SECRET=replace-with-a-long-random-string
BLOB_READ_WRITE_TOKEN=
```

## Gallery storage modes

- Local development: admin uploads write files to `public/assets/gallery` and metadata to `data/gallery.json`
- Production without blob token: gallery becomes manual and Vercel-safe; add assets and metadata through code commits
- Production with `BLOB_READ_WRITE_TOKEN`: admin uploads go to Vercel Blob and metadata is stored in a blob manifest

## Free-first deployment path

If you want to stay free and simple, keep `BLOB_READ_WRITE_TOKEN` empty.
In that mode, upload images by adding them to `public/assets/gallery`, update `data/gallery.json`, then push to Vercel.

If you later want runtime uploads from the admin screen, create a Vercel Blob store and add its read/write token to `BLOB_READ_WRITE_TOKEN`.