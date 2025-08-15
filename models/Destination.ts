import mongoose from "mongoose";

export interface IDestination extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  significance: string;
  image: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new mongoose.Schema<IDestination>(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 characters long"],
      maxlength: [100, "Can't be longer than 100 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "Description can't exceed 500 characters"],
    },
    significance: {
      type: String,
      required: true,
      maxlength: [200, "Significance can't exceed 200 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      enum: ["Mecca", "Madinah"],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.models.Destination as mongoose.Model<IDestination> || mongoose.model<IDestination>("Destination", destinationSchema);

export default Destination;