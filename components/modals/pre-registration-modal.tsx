"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PreRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  tripName: string
  tripDate: string
}

export function PreRegistrationModal({ isOpen, onClose, tripName, tripDate }: PreRegistrationModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Pre-registration submitted:", { ...formData, tripName, tripDate })
    alert("Thank you for pre-registering! We will contact you soon.")
    setFormData({ name: "", email: "", phone: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">Pre-Register for {tripName}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Secure your spot for the trip on {tripDate}. We will contact you with more details.
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
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <Button type="submit" className="btn-primary w-full mt-4">
            Submit Pre-Registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
