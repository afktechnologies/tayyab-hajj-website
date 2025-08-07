"use client"

import { useState, useEffect } from "react"

const quotes = [
  {
    text: "And proclaim to mankind the Hajj pilgrimage. They will come to you on foot and on every lean camel; they will come from every distant pass.",
    source: "Quran 22:27",
  },
  {
    text: "Whoever performs Hajj for the sake of Allah and does not utter any obscene speech or do any evil deed, will go back (free of sin) as his mother bore him.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    text: "The guests of Allah are three: the one who performs Hajj, the one who performs Umrah, and the one who fights in the way of Allah.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    text: "One Umrah is an expiation for the sins committed between it and the next, and Hajj which is accepted will receive no other reward than Paradise.",
    source: "Prophet Muhammad (PBUH)",
  },
]

export function IslamicQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-islamic-gradient py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative h-32 flex items-center justify-center">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                  index === currentQuote ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-white text-lg md:text-xl font-arabic leading-relaxed mb-4 px-4">"{quote.text}"</p>
                <p className="text-yellow-300 font-semibold">- {quote.source}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentQuote ? "bg-yellow-400" : "bg-white bg-opacity-30"
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
