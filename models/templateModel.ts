import mongoose, { Document, Model } from "mongoose";

interface ITemplate extends Document {
  name: string;
  description: string;
  category: string;
  template: string;
  templateVars: string[];
  preview?: string;
  previewValues?: string[];
}

const templateSchema = new mongoose.Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "onboarding",
        "transactional",
        "reminder",
        "engagement",
        "promotional",
      ],
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    templateVars: {
      type: [String],
      required: true,
    },
    preview: {
      type: String,
      trim: true,
    },
    previewValues: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Template =
  (mongoose.models.Template as Model<ITemplate>) ||
  mongoose.model<ITemplate>("Template", templateSchema);

export default Template;
