import mongoose, { Schema, Document } from "mongoose";

export interface IImage {
  src: string;
  alt: string;
}

export interface ITrip extends Document {
  _id: mongoose.Types.ObjectId;
  destination: string;
  date: Date;
  description: string;
  image: IImage;
  duration: string;
  price: string;
}

const TripSchema: Schema = new Schema({
  destination: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { src: { type: String, required: true }, alt: { type: String, required: true } },
  duration: { type: String, required: true },
  price: { type: String, required: true },
});

export default mongoose.models.Trip || mongoose.model<ITrip>("Trip", TripSchema);