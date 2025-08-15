import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { ITestimonial } from "@/models/Testimonial"

interface TestimonialsPreviewProps {
  testimonials: ITestimonial[];
}

export default function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">"{testimonial.feedback}"</p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}