import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarUI } from "@/components/calendar-ui"

export default function TripsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-islamic-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">Upcoming Sacred Journeys</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Join our carefully planned Hajj and Umrah trips with expert guidance and premium accommodations
          </p>
        </div>
      </section>

      {/* Interactive Calendar Section */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">2025-2026 Trip Calendar</h2>
            <p className="text-lg text-gray-600">Limited slots available – reserve early to secure your spot!</p>
          </div>

          <CalendarUI />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-arabic">Stay Updated on New Trips</h3>
              <p className="text-gray-600 mb-6">Be the first to know about new trip announcements and special offers</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Email for newsletter"
                />
                <Button className="btn-primary px-8">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
