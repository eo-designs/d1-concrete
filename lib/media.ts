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

function isVercelProductionDeployment() {
  return process.env.VERCEL_ENV === 'production';
}

function getProductionBaseUrl(value?: string) {
  const baseUrl = readEnvValue(value);
  return isVercelProductionDeployment() && baseUrl ? baseUrl : undefined;
}

function withImageBasePath(fileName: string) {
  const baseUrl = getProductionBaseUrl(process.env.NEXT_PUBLIC_MEDIA_CLOUDINARY_BASE_URL);

  if (!baseUrl) {
    return `/assets/brand/${fileName}`;
  }

  return `${baseUrl.replace(/\/$/, '')}/${fileName}`;
}

function withVideoBasePath(fileName: string) {
  const baseUrl =
    getProductionBaseUrl(process.env.NEXT_PUBLIC_MEDIA_CLOUDINARY_VIDEO_BASE_URL) ||
    getProductionBaseUrl(process.env.NEXT_PUBLIC_MEDIA_CLOUDINARY_BASE_URL);

  if (!baseUrl) {
    return `/assets/brand/${fileName}`;
  }

  return `${baseUrl.replace(/\/$/, '')}/${fileName}`;
}

function fromEnvOrImageDefault(envValue: string | undefined, fileName: string) {
  return readEnvValue(envValue) || withImageBasePath(fileName);
}

export const media = {
  homeBackgroundVideo:
    normalizeHomeBackgroundUrl(process.env.NEXT_PUBLIC_MEDIA_HOME_BACKGROUND_URL) ||
    (isVercelProductionDeployment() ? withVideoBasePath('home_page_background.mov') : undefined),
  galleryImage1: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_1_URL, 'image1.png'),
  galleryImage2: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_2_URL, 'image2.png'),
  galleryImage3: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_3_URL, 'image3.png'),
  galleryImage4: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_4_URL, 'image4.png'),
  galleryImage5: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_5_URL, 'image5.png'),
  galleryImage6: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_GALLERY_IMAGE_6_URL, 'image6.png'),
  californiaMapImage: fromEnvOrImageDefault(process.env.NEXT_PUBLIC_MEDIA_CA_MAP_URL, 'ca-map.png')
};
