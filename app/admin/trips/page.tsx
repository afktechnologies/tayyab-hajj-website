import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ITrip } from "@/models/Trip";
import DeleteTripButton from "@/components/layout/Admin/Trips/DeleteTripButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#171717] font-arabic">Manage Trips</h1>
        <Link href="/admin/trips/create">
          <Button className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]">
            Add New Trip
          </Button>
        </Link>
      </div>
      {error || !trips ? (
        <p className="text-[#654A55] text-center">Unable to load trips. Please try again later.</p>
      ) : (
        <div className="bg-[#FAFAFA] rounded-lg shadow-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#171717] font-semibold">Destination</TableHead>
                <TableHead className="text-[#171717] font-semibold">Date</TableHead>
                <TableHead className="text-[#171717] font-semibold">Description</TableHead>
                <TableHead className="text-[#171717] font-semibold">Image</TableHead>
                <TableHead className="text-[#171717] font-semibold">Duration</TableHead>
                <TableHead className="text-[#171717] font-semibold">Price</TableHead>
                <TableHead className="text-[#171717] font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-[#654A55]">
                    No trips found.
                  </TableCell>
                </TableRow>
              ) : (
                trips.map((trip) => (
                  <TableRow key={trip._id.toString()}>
                    <TableCell className="text-[#171717]">{trip.destination}</TableCell>
                    <TableCell className="text-[#171717]">
                      {new Date(trip.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-[#171717] line-clamp-2">{trip.description}</TableCell>
                    <TableCell>
                      <div className="relative w-16 h-12">
                        <Image
                          src={trip.image.src || "/placeholder.svg"}
                          alt={trip.image.alt}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-[#171717]">{trip.duration}</TableCell>
                    <TableCell className="text-[#171717]">{trip.price}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/admin/trips/edit/${trip._id}`}>
                          <Button className="bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA]">
                            Edit
                          </Button>
                        </Link>
                        <DeleteTripButton id={trip._id.toString()} destination={trip.destination} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}