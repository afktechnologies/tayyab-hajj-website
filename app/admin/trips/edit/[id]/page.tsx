import { ITrip } from "@/models/Trip";
import { notFound } from "next/navigation";
import TripForm from "@/components/layout/Admin/Trips/TripForm";

async function getTrip(id: string): Promise<{ trip: ITrip | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/trips?id=${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { trip: null, error: "Failed to fetch trip" };
    }
    const trip = await response.json();
    return { trip: trip || null };
  } catch (error) {
    return { trip: null, error: "Server error" };
  }
}

interface EditTripProps {
  params: { id: string };
}

export default async function EditTripPage({ params }: EditTripProps) {
    const { id } = await params;
  const { trip, error } = await getTrip(id);
  if (error || !trip) {
    return notFound();
  }

  return <TripForm initialValues={trip} isEditMode={true} tripId={params.id} />;
}