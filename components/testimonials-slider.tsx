"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sister Fatima Ahmed",
    location: "Toronto, Canada",
    text: "Alhamdulillah, the most spiritually fulfilling experience of my life. Sheikh Abdullahu's guidance made every moment meaningful. The organization was flawless, and the spiritual atmosphere was truly uplifting.",
    rating: 5,
    photo: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Brother Omar Hassan",
    location: "New York, USA",
    text: "Professional service, beautiful accommodations, and authentic Islamic guidance. Highly recommend Taybah Hajj & Umrah. Every detail was taken care of, allowing us to focus entirely on our worship.",
    rating: 5,
    photo: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Sister Aisha Mohammad",
    location: "California, USA",
    text: "The VIP package exceeded all expectations. Every detail was perfectly arranged. May Allah reward the entire team for their dedication and care. Truly a journey of a lifetime.",
    rating: 5,
    photo: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Brother Yusuf Khan",
    location: "Vancouver, Canada",
    text: "An unforgettable experience. The guides were knowledgeable, the hotels were excellent, and the group camaraderie was wonderful. JazakAllah Khair!",
    rating: 5,
    photo: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Amina Rashid",
    location: "Houston, USA",
    text: "As a first-time pilgrim, I was nervous, but Taybah Hajj & Umrah made everything so easy and comforting. Their spiritual support was invaluable.",
    rating: 5,
    photo: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSlider() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Rotate every 6 seconds
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative h-[300px] md:h-[250px] flex items-center justify-center overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <Card className="w-full p-6 shadow-lg">
                <CardContent className="flex flex-col items-center">
                  {testimonial.photo && (
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        src={testimonial.photo || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTestimonial ? "bg-yellow-500" : "bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
