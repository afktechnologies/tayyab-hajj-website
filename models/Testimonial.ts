import mongoose from "mongoose";

export interface ITestimonial extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 characters long"],
      maxlength: [32, "Can't be longer than 32 characters"],
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    feedback: {
      type: String,
      required: true,
      maxlength: [1000, "Feedback can't exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.models.Testimonial as mongoose.Model<ITestimonial> || mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;