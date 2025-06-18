import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["orphan_marriage", "education", "healthcare", "self_earning", "food", "other"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    documents: [{
      type: String,
      required: true,
    }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

export const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema) 