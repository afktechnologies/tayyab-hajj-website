import TripList from "@/components/layout/Admin/Trips/TripList";
import { ITrip } from "@/models/Trip";

async function getTrips(): Promise<{ trips: ITrip[] | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/trips`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { trips: null, error: "Failed to fetch trips" };
    }
    const data = await response.json();
    return { trips: data.trips || [] };
  } catch (error) {
    return { trips: null, error: "Server error" };
  }
}

export default async function AdminTripsPage() {
  const { trips, error } = await getTrips();

  return <TripList trips={trips} error={error} />;
}