import mongoose, { Schema, Document } from "mongoose";

export interface IImage {
  src: string;
  alt: string;
}

export interface IGalleryItem extends Document {
    _id: mongoose.Types.ObjectId;
  category: string;
  images: IImage[];
}

const GalleryItemSchema: Schema = new Schema({
  category: { type: String, required: true, unique: true },
  images: [{ src: { type: String, required: true }, alt: { type: String, required: true } }],
});

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);