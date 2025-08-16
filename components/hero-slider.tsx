"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const slides = [
  {
    image: '/images/kaaba.jpg',
    quote:
      '"And it is the right of Allah upon the people that they perform Hajj to the House - whoever is able to find thereto a way." - Quran 3:97',
    title: "Sacred Kaaba",
    bookLink: "/services",
    whatsappLink:
      "https://chat.whatsapp.com/JHOMSw0RIPp5AHODbhLB91?mode=ems_copy_c",
    contactLink: "/contact",
  },
  {
    image: "/images/nabwi.jpg",
    quote:
      '"One prayer in my mosque is better than 1,000 prayers elsewhere, except in the Sacred Mosque." - Prophet Muhammad (PBUH)',
    title: "Masjid An-Nabawi",
    bookLink: "/services",
    whatsappLink:
      "https://chat.whatsapp.com/JHOMSw0RIPp5AHODbhLB91?mode=ems_copy_c",
    contactLink: "/contact",
  },
  {
    image: "/images/pilgrims.jpg",
    quote:
      '"Whoever performs Hajj and does not commit any obscenity or transgression, he returns as pure as the day his mother bore him." - Prophet Muhammad (PBUH)',
    title: "Our Pilgrims",
    bookLink: "/services",
    whatsappLink:
      "https://chat.whatsapp.com/JHOMSw0RIPp5AHODbhLB91?mode=ems_copy_c",
    contactLink: "/contact",
  },
  {
    image: "/images/rituals.jpg",
    quote: '"The reward for an accepted Hajj is nothing but Paradise." - Prophet Muhammad (PBUH)',
    title: "Sacred Rituals",
    bookLink: "/services",
    whatsappLink:
      "https://chat.whatsapp.com/JHOMSw0RIPp5AHODbhLB91?mode=ems_copy_c",
    contactLink: "/contact",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   }, 5000)
  //   return () => clearInterval(timer)
  // }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 font-arabic">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-8 font-arabic leading-relaxed">{slide.quote}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={slide.bookLink}>
                    <Button className="btn-primary text-lg px-8 py-3">Book Now</Button>
                  </Link>
                  <a href={slide.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="btn-secondary text-lg px-8 py-3">Join WhatsApp Group</Button>
                  </a>
                  <Link href={slide.contactLink}>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 bg-transparent"
                    >
                      Send Message
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-yellow-500" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
