"use client"

import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export function WhatsAppButton() {
  const pathname = usePathname()
  
    // Hide navbar for /auth/login or /admin routes
    if (pathname === "/auth/login" || pathname.startsWith("/admin")) {
      return null
    }

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/+16124071666",
      "_blank",
    )
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
