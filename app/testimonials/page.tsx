"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { FeedbackFormModal } from "@/components/modals/feedback-form-modal"

export default function TestimonialsPage() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-islamic-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">Pilgrim Testimonials</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Hear directly from our satisfied travelers about their transformative journeys
          </p>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic text-gray-800">
            Over 500+ Satisfied Travelers Since 2022
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to spiritual guidance and professional service has made us a trusted choice for Hajj and
            Umrah.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-600 mb-2">500+</div>
              <p className="text-gray-700 font-semibold">Happy Pilgrims</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-800 mb-2">30+</div>
              <p className="text-gray-700 font-semibold">Successful Groups Led</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-gray-700 font-semibold">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <TestimonialsSlider />
          <div className="text-center mt-12">
            <Button className="btn-primary" onClick={() => setIsFeedbackModalOpen(true)}>
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Photos and Videos from Group Trips (Placeholder) */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 font-arabic text-gray-800">Moments from Our Sacred Journeys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=240&width=360"
                alt="Group in Mecca"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold">
                Mecca Group Tour
              </div>
            </div>
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=240&width=360"
                alt="Pilgrims in Madinah"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold">
                Madinah Reflections
              </div>
            </div>
            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=240&width=360"
                alt="Hajj Rituals"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold">
                Hajj Rituals (Video)
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery">
              <Button className="btn-secondary">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      <FeedbackFormModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
    </div>
  )
}
