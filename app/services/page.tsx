"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Users, Plane, MessageCircle, Star, Shield } from "lucide-react"
import { BookingFormModal } from "@/components/modals/booking-form-modal"
import { HajjRegistrationModal } from "@/components/modals/hajj-registration-modal"
import Link from "next/link"

const services = [
  {
    id: "book-umrah",
    icon: Calendar,
    title: "Book Upcoming Umrah Trip",
    description: "Reserve your spot for our carefully planned Umrah journeys with premium accommodations",
    features: ["10-day packages", "5-star hotels", "Expert guidance", "Group spiritual sessions"],
    color: "yellow",
    action: "modal-booking-umrah",
  },
  {
    id: "hajj-2026",
    icon: Star,
    title: "Hajj 2026 Registration",
    description: "Early registration for our comprehensive Hajj 2026 package with full support",
    features: ["14-day complete package", "All rituals included", "Experienced guides", "Premium tents in Mina"],
    color: "green",
    action: "modal-hajj-registration",
  },
  {
    id: "visa",
    icon: Plane,
    title: "Umrah Visa Services",
    description: "Professional visa assistance and documentation support for hassle-free travel",
    features: ["Document preparation", "Application submission", "Status tracking", "Express processing"],
    color: "blue",
    action: "contact-visa",
  },
  {
    id: "whatsapp-group",
    icon: MessageCircle,
    title: "WhatsApp Group Support",
    description: "Join our active community for updates, support, and spiritual discussions",
    features: ["24/7 support", "Travel updates", "Community connection", "Expert advice"],
    color: "green",
    action: "external-whatsapp-group",
  },
  {
    id: "group-discounts",
    icon: Users,
    title: "Group Discounts",
    description: "Special rates for families, mosque groups, and community organizations",
    features: ["Family packages", "Mosque group rates", "Custom itineraries", "Flexible payment plans"],
    color: "purple",
    action: "contact-general",
  },
  {
    id: "vip-packages",
    icon: Shield,
    title: "Private VIP Packages",
    description: "Exclusive premium services with personalized attention and luxury amenities",
    features: ["Airport VIP service", "Private transportation", "Exclusive Ziyarat tours", "Personal guide"],
    color: "red",
    action: "contact-vip",
  },
]

const faqs = [
  {
    question: "What is included in the Umrah package?",
    answer:
      "Our Umrah packages include round-trip flights, 5-star hotel accommodations within walking distance of the Haram, all ground transportation, guided Ziyarat tours, group spiritual sessions with Sheikh Abdullahu, and 24/7 support throughout your journey.",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 3-4 months in advance to secure the best accommodations and flight options. For Hajj, early registration is essential due to limited quotas and high demand.",
  },
  {
    question: "Do you provide visa assistance?",
    answer:
      "Yes, we provide complete visa assistance including document preparation, application submission, and status tracking. Our experienced team ensures all requirements are met for a smooth visa process.",
  },
  {
    question: "What makes your tours different from others?",
    answer:
      "Our tours are led by Sheikh Abdullahu Nur Abul Fadli with 40+ years of Islamic scholarship and 30+ Hajj/Umrah groups. We combine authentic religious guidance with premium accommodations and professional logistics management.",
  },
  {
    question: "Are there payment plan options available?",
    answer:
      "Yes, we offer flexible payment plans to make your pilgrimage more accessible. Contact us to discuss payment options that work best for your situation.",
  },
  {
    question: "What support is available during the trip?",
    answer:
      "We provide 24/7 support with multilingual staff, experienced local guides, emergency assistance, and continuous communication through our WhatsApp group. Our team is always available to help with any needs.",
  },
]

const testimonialsPreview = [
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

export default function ServicesPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isHajjModalOpen, setIsHajjModalOpen] = useState(false)
  const [currentTripType, setCurrentTripType] = useState("")

  const handleServiceAction = (actionType: string, tripType?: string) => {
    switch (actionType) {
      case "modal-booking-umrah":
        setCurrentTripType(tripType || "Umrah")
        setIsBookingModalOpen(true)
        break
      case "modal-hajj-registration":
        setIsHajjModalOpen(true)
        break
      case "contact-visa":
        window.open(
          "https://wa.me/15551234567?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20Umrah%20Visa%20Services.",
          "_blank",
        )
        break
      case "external-whatsapp-group":
        window.open("https://chat.whatsapp.com/your-group-invite", "_blank")
        break
      case "contact-general":
      case "contact-vip":
        window.location.href = "/contact"
        break
      default:
        console.log("Unknown action:", actionType)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-desert-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-arabic">Our Sacred Services</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive pilgrimage services designed to make your spiritual journey seamless and memorable
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" id="services-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              const colorClasses = {
                yellow: "bg-yellow-100 text-yellow-600",
                green: "bg-green-100 text-green-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                red: "bg-red-100 text-red-600",
              }

              let buttonText = "Learn More"
              if (service.action === "modal-booking-umrah") buttonText = "Book Now"
              if (service.action === "modal-hajj-registration") buttonText = "Register Interest"
              if (service.action === "contact-visa") buttonText = "Contact for Visa"
              if (service.action === "external-whatsapp-group") buttonText = "Join Group"
              if (service.action === "contact-general") buttonText = "Contact Us"
              if (service.action === "contact-vip") buttonText = "Inquire Now"

              return (
                <Card key={index} className="card-hover" id={service.id}>
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[service.color as keyof typeof colorClasses]}`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-arabic text-center">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="btn-primary w-full"
                      onClick={() => handleServiceAction(service.action, service.title)}
                    >
                      {buttonText}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-warm-beige" id="faqs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about our pilgrimage services</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">What Our Pilgrims Say</h2>
            <p className="text-lg text-gray-600">Hear from those who have experienced the journey with us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsPreview.map((testimonial, index) => (
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

      {/* Contact Section */}
      <section className="py-16 bg-islamic-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-arabic">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact our experienced team to discuss your pilgrimage needs and find the perfect package for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="btn-primary text-lg px-8 py-3">Schedule Consultation</Button>
            </Link>
            <a href="tel:+15551234567">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 bg-transparent"
              >
                Call Now: +1 (555) 123-4567
              </Button>
            </a>
          </div>
        </div>
      </section>

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tripType={currentTripType}
      />
      <HajjRegistrationModal isOpen={isHajjModalOpen} onClose={() => setIsHajjModalOpen(false)} />
    </div>
  )
}
