"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Kaaba during Hajj",
    category: "Mecca",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Masjid An-Nabawi interior",
    category: "Madinah",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Group photo in front of Kaaba",
    category: "Group Tours",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Pilgrims performing Tawaf",
    category: "Mecca",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Mount Uhud Madinah",
    category: "Ziyarat",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Group at Jabal al-Thur",
    category: "Group Tours",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Mina tents during Hajj",
    category: "Mecca",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Masjid Quba Madinah",
    category: "Ziyarat",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Pilgrims at Mount Arafat",
    category: "Mecca",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Group photo at Masjid An-Nabawi",
    category: "Group Tours",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cave Hira Mecca",
    category: "Ziyarat",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Rawdah Sharif interior",
    category: "Madinah",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const filteredImages = galleryImages.filter((img) => filter === "All" || img.category === filter)
    const currentIndexInFiltered = filteredImages.findIndex((img) => img.src === galleryImages[selectedImage].src)

    let newIndexInFiltered = currentIndexInFiltered
    if (direction === "next") {
      newIndexInFiltered = (currentIndexInFiltered + 1) % filteredImages.length
    } else {
      newIndexInFiltered = (currentIndexInFiltered - 1 + filteredImages.length) % filteredImages.length
    }

    const newGlobalIndex = galleryImages.findIndex((img) => img.src === filteredImages[newIndexInFiltered].src)
    setSelectedImage(newGlobalIndex)
  }

  const filteredImages = galleryImages.filter((image) => filter === "All" || image.category === filter)
  const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-islamic-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">Our Sacred Journey Gallery</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Relive the beautiful moments and spiritual experiences from our past Hajj and Umrah tours
          </p>
        </div>
      </section>

      {/* Filter Options */}
      <section className="py-8 bg-warm-beige">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                className={`${filter === cat ? "btn-primary" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-60 overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                onClick={() => openLightbox(galleryImages.indexOf(image))} // Pass global index
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold text-center px-4">{image.alt}</p>
                </div>
                <div className="absolute bottom-2 left-2 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full">
                  {image.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
              <p className="text-lg font-semibold">{galleryImages[selectedImage].alt}</p>
              <p className="text-sm text-gray-300">{galleryImages[selectedImage].category}</p>
            </div>
          </div>

          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  )
}
