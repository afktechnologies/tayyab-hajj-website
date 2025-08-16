import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { Suspense } from "react"

export default async function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-desert-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-arabic">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We are here to assist you with your sacred journey. Reach out to our team for any inquiries.
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">Get in Touch</h2>
              <p className="text-lg text-gray-600">
                Our dedicated team is ready to answer your questions and help you plan your Hajj or Umrah trip.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Phone</h3>
                    <a href="tel:+16124071666" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      +1612-407-1666
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Email</h3>
                    <a
                      href="mailto:tayyabhajjumrah@gmail.com"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      tayyabhajjumrah@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Office Location</h3>
                    <p className="text-gray-600">373 pedersen st Ste 102
Saint Paul Mn 55119</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">WhatsApp Group</h3>
                    <a
                      href="https://chat.whatsapp.com/JHOMSw0RIPp5AHODbhLB91?mode=ems_copy_c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Join our community for updates
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
             <Suspense fallback={<div className="text-center text-gray-600">Loading contact form...</div>}>
            <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-arabic text-gray-800">Find Us on the Map</h2>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2823.5599730325016!2d-93.01585522392446!3d44.952612471070125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f7d6066e384b79%3A0xc1b0abe3ff59ea5c!2s373%20Pedersen%20St%2C%20St%20Paul%2C%20MN%2055119%2C%20USA!5e0!3m2!1sen!2sin!4v1755358664252!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location on Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
