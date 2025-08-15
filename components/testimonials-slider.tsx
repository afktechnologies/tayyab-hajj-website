"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ITestimonial } from "@/models/Testimonial"

interface TestimonialsSliderProps {
  initialTestimonials?: ITestimonial[];
}

export function TestimonialsSlider({ initialTestimonials = [] }: TestimonialsSliderProps) {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>(initialTestimonials)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/testimonials`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (err) {
        setError("Unable to load testimonials. Please try again later.");
      }
    };

    if (initialTestimonials.length === 0) {
      fetchTestimonials();
    }
  }, [initialTestimonials]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000) // Rotate every 6 seconds
      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (error) {
    return <p className="text-gray-600 text-center text-lg">{error}</p>
  }

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-gray-600 text-center text-lg">No testimonials available.</p>
  }

  return (
    <div className="relative py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative h-[300px] md:h-[250px] flex items-center justify-center overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id.toString()}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <Card className="w-full p-6 shadow-lg">
                <CardContent className="flex flex-col items-center">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">"{testimonial.feedback}"</p>
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
        {testimonials.length > 1 && (
          <>
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
          </>
        )}

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