import { IDestination } from "@/models/Destination";
import DestinationForm from "@/components/layout/Admin/Destinations/DestinationForm";
import { notFound } from "next/navigation";

async function getDestination(id: string): Promise<{ destination: IDestination | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/destinations?id=${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { destination: null, error: "Failed to fetch destination" };
    }
    const data = await response.json();
    return { destination: data || null };
  } catch (error) {
    return { destination: null, error: "Server error" };
  }
}

interface EditDestinationProps {
  params: { id: string };
}

export default async function EditDestination({ params }: EditDestinationProps) {
  const { id } = await params;
  const { destination, error } = await getDestination(id);
  if (error || !destination) {
    return notFound();
  }

  return <DestinationForm initialValues={destination} isEditMode={true} destinationId={params.id} />;
}