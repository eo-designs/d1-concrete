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
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_MEDIA_CLOUDINARY_BASE_URL=
NEXT_PUBLIC_MEDIA_CLOUDINARY_VIDEO_BASE_URL=
```

## Brand media behavior

- Local development: brand media resolves to local files in `public/assets/brand`
- Production: if `NEXT_PUBLIC_MEDIA_CLOUDINARY_BASE_URL` is set, brand media resolves to Cloudinary URLs
- Safe fallback: if that production variable is empty, local file paths are still used

## Uploading brand media to Cloudinary

1. Set Cloudinary credentials in `.env.local`
2. Run `npm run cloudinary:upload`
3. Set `NEXT_PUBLIC_MEDIA_CLOUDINARY_BASE_URL` and `NEXT_PUBLIC_MEDIA_CLOUDINARY_VIDEO_BASE_URL` in Vercel Production to your Cloudinary base folder URLs

## Gallery admin mode

- Local development: admin uploads write files to `public/assets/gallery` and metadata to `data/gallery.json`
- Production: manual mode only (commit gallery assets and `data/gallery.json` changes)
