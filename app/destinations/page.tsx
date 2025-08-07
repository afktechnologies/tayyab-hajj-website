"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Clock } from "lucide-react"
import Image from "next/image"

const meccaSites = [
  {
    name: "Masjid Al-Haram",
    description: "The holiest mosque in Islam, surrounding the sacred Kaaba where millions perform Tawaf.",
    image: "/placeholder.svg?height=300&width=400",
    significance: "Direction of prayer for all Muslims worldwide",
  },
  {
    name: "Mina",
    description: 'The tent city where pilgrims stay during Hajj, known as the "City of Tents".',
    image: "/placeholder.svg?height=300&width=400",
    significance: "Essential stop during Hajj pilgrimage",
  },
  {
    name: "Mount Arafat",
    description: "The most important site of Hajj where pilgrims perform the standing (Wuquf).",
    image: "/placeholder.svg?height=300&width=400",
    significance: "The pinnacle of Hajj pilgrimage",
  },
  {
    name: "Cave Hira",
    description: "The cave where Prophet Muhammad (PBUH) received the first revelation of the Quran.",
    image: "/placeholder.svg?height=300&width=400",
    significance: "Birthplace of Islamic revelation",
  },
]

const madinahSites = [
  {
    name: "Masjid An-Nabawi",
    description: "The Prophet's Mosque, second holiest mosque in Islam and burial place of Prophet Muhammad (PBUH).",
    image: "/placeholder.svg?height=300&width=400",
    significance: "Burial place of Prophet Muhammad (PBUH)",
  },
  {
    name: "Rawdah Sharif",
    description: "The blessed garden between the Prophet's pulpit and his grave, a piece of Paradise.",
    image: "/placeholder.svg?height=300&width=400",
    significance: "A garden from the gardens of Paradise",
  },
  {
    name: "Masjid Quba",
    description: "The first mosque built by Prophet Muhammad (PBUH), with special spiritual significance.",
    image: "/placeholder.svg?height=300&width=400",
    significance: "First mosque in Islamic history",
  },
  {
    name: "Mount Uhud",
    description: "Historic mountain site of the Battle of Uhud, with the graves of martyrs including Hamza (RA).",
    image: "/placeholder.svg?height=300&width=400",
    significance: "Site of important Islamic battle",
  },
]

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-desert-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-arabic">Sacred Destinations</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the holy sites of Mecca and Madinah with our expert-guided tours and premium accommodations
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mecca" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="mecca"
                className="py-3 text-lg font-semibold data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                🕋 Mecca
              </TabsTrigger>
              <TabsTrigger
                value="madinah"
                className="py-3 text-lg font-semibold data-[state=active]:bg-green-800 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                🕌 Madinah
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mecca">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic text-gray-800">🕋 Holy City of Mecca</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  The birthplace of Islam and the direction of prayer for Muslims worldwide
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-yellow-800">
                    <Star className="h-5 w-5" />
                    <span className="font-semibold">
                      Premium Accommodation: 5-star hotels within walking distance of Haram
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {meccaSites.map((site, index) => (
                  <Card key={index} className="card-hover overflow-hidden">
                    <div className="relative h-48">
                      <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-yellow-600" />
                        <span className="font-arabic">{site.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{site.description}</p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800 font-medium">
                          <strong>Significance:</strong> {site.significance}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="madinah">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic text-gray-800">
                  🕌 The Illuminated City of Madinah
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  The city of the Prophet (PBUH) and the second holiest city in Islam
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-green-800">
                    <Star className="h-5 w-5" />
                    <span className="font-semibold">
                      Premium Stay: 5-star hotel within walking distance of Masjid An-Nabawi
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {madinahSites.map((site, index) => (
                  <Card key={index} className="card-hover overflow-hidden">
                    <div className="relative h-48">
                      <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <span className="font-arabic">{site.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{site.description}</p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800 font-medium">
                          <strong>Significance:</strong> {site.significance}
                        </p>
                      </div>
                      {site.name === "Rawdah Sharif" && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-yellow-800">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Appointment required - we handle all arrangements
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Transportation & Accommodation Highlights */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">Premium Travel Experience</h2>
            <p className="text-lg text-gray-600">Enjoy comfort and convenience throughout your sacred journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl font-arabic text-center">🚌 VIP Transportation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-600">
                  <li>• Luxury air-conditioned buses</li>
                  <li>• Professional drivers with local expertise</li>
                  <li>• Direct routes to all sacred sites</li>
                  <li>• Comfortable seating for long journeys</li>
                  <li>• On-board refreshments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl font-arabic text-center">🏨 5-Star Accommodations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-600">
                  <li>• Walking distance to both Harams</li>
                  <li>• Premium rooms with modern amenities</li>
                  <li>• 24/7 room service and concierge</li>
                  <li>• Halal dining options</li>
                  <li>• Prayer facilities and Qibla direction</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
