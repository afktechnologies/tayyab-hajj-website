import mongoose from "mongoose";

export interface ILead extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  enquiryFor?: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadsSchema = new mongoose.Schema<ILead>(
  {
    enquiryFor: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 characters long"],
      maxlength: [32, "Can't be longer than 32 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, "Message can't exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Leads = mongoose.models.Leads as mongoose.Model<ILead> || mongoose.model<ILead>("Leads", leadsSchema);

export default Leads;