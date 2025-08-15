import mongoose from "mongoose";

export interface IService extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema<IService>(
  {
    title: {
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
    features: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0 && arr.length <= 10,
        message: "Features must have at least 1 and at most 10 items",
      },
    },
    icon: {
      type: String,
      required: true,
      enum: ["Calendar", "Star", "Plane", "MessageCircle", "Users", "Shield"],
    },
    color: {
      type: String,
      required: true,
      enum: ["yellow", "green", "blue", "purple", "red"],
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.models.Service as mongoose.Model<IService> || mongoose.model<IService>("Service", serviceSchema);

export default Service;