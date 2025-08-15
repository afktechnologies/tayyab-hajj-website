import { IGalleryItem } from "@/models/GalleryItem";
import GalleryForm from "@/components/layout/Admin/Gallery/GalleryForm";
import { notFound } from "next/navigation";

async function getGalleryItem(id: string): Promise<{ galleryItem: IGalleryItem | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { galleryItem: null, error: "Failed to fetch gallery items" };
    }
    const data = await response.json();
    const galleryItem = data.galleryItems.find((item: IGalleryItem) => item._id.toString() === id);
    return { galleryItem: galleryItem || null };
  } catch (error) {
    return { galleryItem: null, error: "Server error" };
  }
}

interface EditGalleryProps {
  params: { id: string };
}

export default async function EditGallery({ params }: EditGalleryProps) {
  const { id } = await params;
  const { galleryItem, error } = await getGalleryItem(id);
  if (error || !galleryItem) {
    return notFound();
  }

  return <GalleryForm initialValues={galleryItem} isEditMode={true} />;
}