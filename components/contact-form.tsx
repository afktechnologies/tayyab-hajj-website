"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center font-arabic">Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <Label htmlFor="subject" className="mb-2 block">
              Subject
            </Label>
            <Input id="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block">
              Message
            </Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} rows={5} required />
          </div>
          <Button type="submit" className="btn-primary w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
