import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    part: [{ type: String, enum: ["legs", "chest", "back", "shoulder"] }],
    maxWeight: { type: Number },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Record", RecordSchema);
