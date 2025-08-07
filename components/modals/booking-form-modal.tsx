"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
  tripType: string
}

export function BookingFormModal({ isOpen, onClose, tripType }: BookingFormModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", passport: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking form submitted:", { ...formData, tripType })
    alert(`Thank you for your ${tripType} booking inquiry! We will contact you soon.`)
    setFormData({ name: "", email: "", passport: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">Book Your {tripType} Trip</DialogTitle>
          <DialogDescription className="text-gray-600">
            Please fill out the form below to inquire about booking your {tripType} trip.
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
            <Label htmlFor="passport" className="text-right">
              Passport #
            </Label>
            <Input id="passport" value={formData.passport} onChange={handleChange} className="col-span-3" required />
          </div>
          <Button type="submit" className="btn-primary w-full mt-4">
            Submit Booking Inquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
