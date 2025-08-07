import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold font-arabic">ط</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-arabic">Taybah Hajj & Umrah</h3>
                <p className="text-xs text-gray-400">Sacred Journey Tours</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Guiding Muslims on their sacred journey to the Holy Cities with professional service and spiritual care.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/your-group-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="WhatsApp Group"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/trips" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Upcoming Trips
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#book-umrah" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Book Umrah Trip
                </Link>
              </li>
              <li>
                <Link href="/services#hajj-2026" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Hajj 2026 Registration
                </Link>
              </li>
              <li>
                <Link href="/services#visa" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Umrah Visa Services
                </Link>
              </li>
              <li>
                <Link href="/services#faqs" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/services#vip-packages" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Private VIP Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">info@taybahhajj.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">USA & Canada</span>
              </div>
              <a
                href="https://chat.whatsapp.com/your-group-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Join WhatsApp Group</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Taybah Hajj & Umrah. All rights reserved. |
            <span className="font-arabic ml-2">بسم الله الرحمن الرحيم</span>
          </p>
          <div className="mt-2">
            <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <input
                type="email"
                placeholder="Newsletter Signup (Email)"
                className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Newsletter email input"
              />
              <Button type="submit" className="btn-primary px-4 py-2">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
