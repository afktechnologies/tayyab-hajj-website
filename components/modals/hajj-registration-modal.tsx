"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface HajjRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HajjRegistrationModal({ isOpen, onClose }: HajjRegistrationModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Hajj registration submitted:", formData)
    alert("Thank you for your Hajj 2026 registration interest! We will contact you soon.")
    setFormData({ name: "", email: "", phone: "", interest: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">Hajj 2026 Pre-Registration</DialogTitle>
          <DialogDescription className="text-gray-600">
            Express your interest for Hajj 2026. We will keep you updated on packages and early bird offers.
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interest" className="text-right">
              Interest
            </Label>
            <Textarea
              id="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="e.g., VIP package, family group, specific dates"
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="btn-primary w-full mt-4">
            Submit Interest
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
