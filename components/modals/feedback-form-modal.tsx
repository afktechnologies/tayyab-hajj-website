"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import Loader from "@/components/common/Loader"

interface FeedbackFormModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  location: string
  rating: number
  feedback: string
}

export function FeedbackFormModal({ isOpen, onClose }: FeedbackFormModalProps) {
  const initialValues: FormData = {
    name: "",
    location: "",
    rating: 0,
    feedback: "",
  }

  const [formData, setFormData] = useState<FormData>(initialValues)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Your name is required!")
      .min(3, "The name must be at least 3 characters long")
      .max(32, "The name can't exceed 32 characters"),
    location: Yup.string()
      .required("Location is required!")
      .min(3, "The location must be at least 3 characters long")
      .max(50, "The location can't exceed 50 characters"),
    rating: Yup.number()
      .required("Rating is required!")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    feedback: Yup.string()
      .required("Feedback is required!")
      .max(1000, "Feedback can't exceed 1000 characters"),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      })

      const result = await response.json()

      if (result.success) {
        setFormData(initialValues)
        setSubmitted(true)
        setLoading(false)
        setTimeout(() => {
          setSubmitted(false)
          onClose()
        }, 2000)
      } else {
        setError(result.message || "Something went wrong, please try again.")
        setLoading(false)
      }
    } catch (err) {
      setError("Something went wrong, please try again.")
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 bg-[#FAFAFA] border-[#DCD1D5]">
        {loading && <Loader value="Submitting your feedback" />}
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl text-[#171717]">Share Your Experience</DialogTitle>
          <DialogDescription className="text-[#757575]">
            We'd love to hear about your journey with Taybah Hajj & Umrah.
          </DialogDescription>
        </DialogHeader>
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleBlur }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-[#171717]">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  required
                />
                {touched.name && errors.name && (
                  <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.name}</span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-[#171717]">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  required
                />
                {touched.location && errors.location && (
                  <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.location}</span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-[#171717]">Rating</Label>
                <div className="col-span-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= formData.rating ? "text-[#00F0B1] fill-current" : "text-[#DCD1D5]"
                      }`}
                      onClick={() => handleRatingChange(star)}
                      aria-label={`Rate ${star} stars`}
                    />
                  ))}
                </div>
                {touched.rating && errors.rating && (
                  <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.rating}</span>
                )}
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="feedback" className="text-right pt-2 text-[#171717]">
                  Feedback
                </Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your experience..."
                  className="col-span-3 border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  required
                />
                {touched.feedback && errors.feedback && (
                  <span className="text-[#654A55] text-xs col-span-3 col-start-2">{errors.feedback}</span>
                )}
              </div>
              {error && <span className="text-[#654A55] text-sm block text-center">{error}</span>}
              {submitted && (
                <span className="text-[#00F0B1] text-sm block text-center">
                  Thank you for your feedback!
                </span>
              )}
              <Button
                type="submit"
                className="w-full mt-4 bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1]"
              >
                Submit Feedback
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}