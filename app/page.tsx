import { HeroSlider } from "@/components/hero-slider"
import { IslamicQuotes } from "@/components/islamic-quotes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Plane, MessageCircle, Phone, Star } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    name: "Sister Fatima Ahmed",
    location: "Toronto, Canada",
    text: "Alhamdulillah, the most spiritually fulfilling experience of my life. Sheikh Abdullahu's guidance made every moment meaningful.",
    rating: 5,
  },
  {
    name: "Brother Omar Hassan",
    location: "New York, USA",
    text: "Professional service, beautiful accommodations, and authentic Islamic guidance. Highly recommend Taybah Hajj & Umrah.",
    rating: 5,
  },
  {
    name: "Sister Aisha Mohammad",
    location: "California, USA",
    text: "The VIP package exceeded all expectations. Every detail was perfectly arranged. May Allah reward the entire team.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Quick Action Buttons */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-arabic text-gray-800">
            Start Your Sacred Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Book Upcoming Umrah</h3>
                <p className="text-sm text-gray-600 mb-4">Reserve your spot for our next Umrah journey</p>
                <Link href="/services#book-umrah">
                  <Button className="btn-primary w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Hajj 2026 Info</h3>
                <p className="text-sm text-gray-600 mb-4">Get details about our Hajj 2026 packages</p>
                <Link href="/services#hajj-2026">
                  <Button className="btn-secondary w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plane className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Apply for Visa</h3>
                <p className="text-sm text-gray-600 mb-4">Professional visa assistance services</p>
                <Link href="/services#visa">
                  <Button variant="outline" className="w-full bg-transparent">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Join WhatsApp Group</h3>
                <p className="text-sm text-gray-600 mb-4">Stay updated with our community</p>
                <a href="https://chat.whatsapp.com/your-group-invite" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-500 hover:bg-green-600 text-white w-full">Join Group</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600 mb-4">Speak with our travel experts</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Islamic Quotes Carousel */}
      <IslamicQuotes />

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic text-gray-800">
              Why Choose Taybah Hajj & Umrah?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              With over 500+ satisfied travelers since 2022, we provide exceptional service for your sacred journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Led by Sheikh Abdullahu Nur Abul Fadli with 40+ years in Da'wah and 30+ Hajj/Umrah groups
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Accommodations</h3>
              <p className="text-gray-600">
                5-star hotels within walking distance of Haram in Mecca and Masjid An-Nabawi in Madinah
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Multilingual support team available around the clock for all your needs during the journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic text-gray-800">
              Over 500+ Satisfied Travelers Since 2022
            </h2>
            <p className="text-lg text-gray-600">Hear from those who have experienced the journey with us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/testimonials">
              <Button className="btn-secondary">View All Testimonials</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-desert-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-arabic text-gray-800">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied pilgrims who have experienced the journey of a lifetime with Taybah Hajj & Umrah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="btn-primary text-lg px-8 py-3">Book Your Trip Today</Button>
            </Link>
            <Link href="/contact">
              <Button className="btn-secondary text-lg px-8 py-3">Schedule Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
