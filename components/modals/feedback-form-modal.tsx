"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface FeedbackFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FeedbackFormModal({ isOpen, onClose }: FeedbackFormModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", rating: 0, feedback: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    alert("Thank you for sharing your experience! Your feedback is valuable.")
    setFormData({ name: "", email: "", rating: 0, feedback: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">Share Your Experience</DialogTitle>
          <DialogDescription className="text-gray-600">
            We'd love to hear about your journey with Taybah Hajj & Umrah.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Rating</Label>
            <div className="col-span-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= formData.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                  aria-label={`Rate ${star} stars`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="feedback" className="text-right pt-2">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Your experience..."
              className="col-span-3"
              required
            />
          </div>
          <Button type="submit" className="btn-primary w-full mt-4">
            Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
