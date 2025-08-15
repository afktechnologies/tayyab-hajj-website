import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarUI } from "@/components/calendar-ui";
import Image from "next/image";
import { ITrip } from "@/models/Trip";
import { MapPin, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

async function getTrips(): Promise<{ trips: ITrip[] | null; error?: string }> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/trips`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { trips: null, error: "Failed to fetch trips" };
    }
    const data = await response.json();
    const sortedTrips = data.trips ? [...data.trips].sort((a: ITrip, b: ITrip) => new Date(a.date).getTime() - new Date(b.date).getTime()) : null;
    return { trips: sortedTrips || [] };
  } catch (error) {
    return { trips: null, error: "Server error" };
  }
}

export default async function TripsPage() {
  const { trips, error } = await getTrips();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-islamic-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5000C9]/20 to-[#00F0B1]/20 opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic drop-shadow-lg">
            Upcoming Sacred Journeys
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Join our carefully planned Hajj and Umrah trips with expert guidance and premium accommodations
          </p>
        </div>
      </section>

      {/* Trips Section */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          {error || !trips ? (
            <p className="text-[#654A55] text-center text-lg font-medium">
              Unable to load trips. Please try again later.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <Card
                  key={trip._id.toString()}
                  className="bg-[#FAFAFA] shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-[#DCD1D5]/50"
                >
                  <div className="relative w-full h-56 group">
                    <Image
                      src={trip.image.src || "/placeholder.svg"}
                      alt={trip.image.alt}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">Click to explore</p>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#171717]" />
                      <h3 className="text-2xl font-semibold text-[#171717] font-arabic">{trip.destination}</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-600 line-clamp-3 mb-4">{trip.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#171717]" />
                        <p className="text-gray-600 text-sm">Date: {new Date(trip.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#171717]" />
                        <p className="text-gray-600 text-sm">Duration: {trip.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#171717]" />
                        <p className="text-gray-600 text-sm">Price: {trip.price}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link className="w-full custor-pointer" href={`/contact?enquiryFor=${trip.destination}`} >
                    <Button className="btn-primary w-full">
                      Book Now
                    </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-lg border border-[#DCD1D5]/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-arabic text-[#171717]">
                Stay Updated on New Trips
              </h3>
              <p className="text-gray-600 mb-6">Be the first to know about new trip announcements and special offers</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-[#DCD1D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  aria-label="Email for newsletter"
                />
                <Button className="btn-primary">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}