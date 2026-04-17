export type ProjectCategory = 'residential' | 'commercial';

export type GalleryItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  tags: string[];
  location: string;
  scope: string;
  createdAt: string;
};

export type GalleryInput = Omit<GalleryItem, 'id' | 'createdAt'>;