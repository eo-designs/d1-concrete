import { AdminPanel } from '@/components/AdminPanel';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { getGalleryStorageInfo, readGalleryItems, readGalleryTags } from '@/lib/gallery-store';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [items, tags] = await Promise.all([readGalleryItems(), readGalleryTags()]);
  const storage = getGalleryStorageInfo();

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Protected gallery management with server-side password checks."
        description="This is not a client-stored password. The login is validated inside a server route and persisted with an httpOnly cookie. For production, move image files and metadata to durable storage."
      />
      <Container className="py-16 md:py-20">
        <AdminPanel initialItems={items} initialTags={tags} initialStorage={storage} />
      </Container>
    </>
  );
}