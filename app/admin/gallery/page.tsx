import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { IGalleryItem } from "@/models/GalleryItem";
import DeleteButton from "@/components/layout/Admin/Gallery/DeleteButton";

async function getGalleryItems(): Promise<{ galleryItems: IGalleryItem[] | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { galleryItems: null, error: "Failed to fetch gallery items" };
    }
    const data = await response.json();
    return { galleryItems: data.galleryItems || [] };
  } catch (error) {
    return { galleryItems: null, error: "Server error" };
  }
}

export default async function AdminGalleryPage() {
  const { galleryItems, error } = await getGalleryItems();

  if (error || !galleryItems) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#171717]">Manage Gallery</h1>
          <Link href="/admin/gallery/create">
            <Button className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]">
              Add New Category
            </Button>
          </Link>
        </div>
        <p className="text-[#654A55]">Unable to load gallery items. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#171717]">Manage Gallery</h1>
        <Link href="/admin/gallery/create">
          <Button className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]">
            Add New Category
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item._id.toString()} className="bg-[#FAFAFA] rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-[#171717] mb-4">{item.category}</h2>
            <div className="grid grid-cols-2 gap-2">
              {item.images.map((image, index) => (
                <div key={index} className="relative h-24">
                  <Image src={image.src} alt={image.alt} fill className="object-cover rounded" />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Link href={`/admin/gallery/edit/${item._id}`}>
                <Button className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]">
                  Edit
                </Button>
              </Link>
              <DeleteButton id={item._id.toString()} category={item.category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}