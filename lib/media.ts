function readEnvValue(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function normalizeHomeBackgroundUrl(value?: string) {
  const url = readEnvValue(value);

  if (!url) {
    return undefined;
  }

  if (url.includes('brandon_mora_finish_draft3.mov')) {
    return undefined;
  }

  return url;
}

function withBasePath(fileName: string) {
  const baseUrl = readEnvValue(process.env.NEXT_PUBLIC_MEDIA_BASE_URL);

  if (!baseUrl) {
    return `/assets/brand/${fileName}`;
  }

  return `${baseUrl.replace(/\/$/, '')}/${fileName}`;
}

function fromEnvOrDefault(envValue: string | undefined, fileName: string) {
  return readEnvValue(envValue) || withBasePath(fileName);
}

function fromPrimaryOrLegacyEnv(primary: string | undefined, legacy: string | undefined, fileName: string) {
  return readEnvValue(primary) || readEnvValue(legacy) || withBasePath(fileName);
}

export const media = {
  homeBackgroundVideo: normalizeHomeBackgroundUrl(process.env.NEXT_PUBLIC_MEDIA_HOME_BACKGROUND_URL) || withBasePath('home_page_background.mov'),
  galleryImage1: fromPrimaryOrLegacyEnv(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_1_URL, process.env.NEXT_PUBLIC_MEDIA_GALLERY_VIDEO_1_URL, 'image1.png'),
  galleryImage2: fromPrimaryOrLegacyEnv(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_2_URL, process.env.NEXT_PUBLIC_MEDIA_GALLERY_VIDEO_2_URL, 'image2.png'),
  galleryImage3: fromPrimaryOrLegacyEnv(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_3_URL, process.env.NEXT_PUBLIC_MEDIA_GALLERY_VIDEO_3_URL, 'image3.png'),
  galleryImage4: fromPrimaryOrLegacyEnv(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_4_URL, process.env.NEXT_PUBLIC_MEDIA_GALLERY_VIDEO_4_URL, 'image4.png'),
  galleryImage5: fromPrimaryOrLegacyEnv(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_5_URL, process.env.NEXT_PUBLIC_MEDIA_GALLERY_VIDEO_5_URL, 'image5.png'),
  galleryImage6: fromEnvOrDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_6_URL, 'image6.png'),
  californiaMapImage: fromEnvOrDefault(process.env.NEXT_PUBLIC_MEDIA_CA_MAP_URL, 'ca-map.png')
};