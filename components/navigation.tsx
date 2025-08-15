"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Hide navbar for /auth/login or /admin routes
  if (pathname === "/auth/login" || pathname.startsWith("/admin")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/trips", label: "Upcoming Trips" },
    { href: "/destinations", label: "Destinations" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/gallery", label: "Gallery" },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>info@taybahhajj.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>🕌 Serving Muslims across USA & Canada</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-arabic">ط</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 font-arabic">Taybah Hajj & Umrah</h1>
                <p className="text-xs text-gray-600">Sacred Journey Tours</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact?enquiryFor=General">
                <Button className="btn-primary cursor-pointer">Contact Us</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-yellow-600 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact?enquiryFor=General">
                  <Button className="btn-primary w-full mt-4 cursor-pointer">Contact Us</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}