"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import Loader from "@/components/common/Loader"
import { useSearchParams } from 'next/navigation';

interface FormData {
  enquiryFor?: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const searchParams = useSearchParams();
      const [enquiryFor, setEnquiryFor] = useState(searchParams.get('enquiryFor'));

      useEffect(() => {
        setEnquiryFor(searchParams.get('enquiryFor'));
      }, [searchParams])

  console.log("Enquiry For:", enquiryFor)
  const initialValues: FormData = {
    enquiryFor: enquiryFor || null,
    name: "",
    email: "",
    subject: "",
    message: "",
  }

  const [formData, setFormData] = useState<FormData>(initialValues)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Your name is required!")
      .min(3, "The name must be at least 3 characters long")
      .max(32, "The name can't exceed 32 characters")
      .matches(/^[a-zA-Z\s]*$/, "Numbers and special characters are not allowed in the name"),
    email: Yup.string()
      .required("Email address is required!")
      .email("Please enter a valid email address"),
    subject: Yup.string().required("Subject is required!"),
    message: Yup.string()
      .required("Message is required!")
      .max(1000, "Your message can't exceed 1000 characters"),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      })

      const result = await response.json()

      if (result.success) {
        setFormData(initialValues)
        setSubmitted(true)
        setLoading(false)
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
    <Card className="max-w-2xl mx-auto shadow-lg bg-[#FAFAFA] border-[#DCD1D5]">
      {loading && <Loader value="Submitting your enquiry" />}
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-[#171717] font-arabic">Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleBlur }) => (
            <Form className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-[#171717]">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  />
                  {touched.name && errors.name && (
                    <span className="text-[#654A55] text-xs mt-1">{errors.name}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block text-[#171717]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                  />
                  {touched.email && errors.email && (
                    <span className="text-[#654A55] text-xs mt-1">{errors.email}</span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="mb-2 block text-[#171717]">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                />
                {touched.subject && errors.subject && (
                  <span className="text-[#654A55] text-xs mt-1">{errors.subject}</span>
                )}
              </div>
              <div>
                <Label htmlFor="message" className="mb-2 block text-[#171717]">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className="border-[#DCD1D5] focus:ring-[#00F0B1] focus:border-[#00F0B1] bg-[#FFFFFF] text-[#171717]"
                />
                {touched.message && errors.message && (
                  <span className="text-[#654A55] text-xs mt-1">{errors.message}</span>
                )}
              </div>
              {error && <span className="text-[#654A55] text-sm block">{error}</span>}
              {submitted && (
                <span className="text-green-600 text-sm block">
                  Thanks for submitting the form, we will contact you soon!
                </span>
              )}
              <Button type="submit" className="w-full bg-[#5000C9] hover:bg-[#5D2DE6] text-[#FAFAFA] focus:ring-[#00F0B1]">
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}