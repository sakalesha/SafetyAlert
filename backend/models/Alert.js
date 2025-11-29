const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: { type: String, default: "General" },
    severity: { type: String, default: "Medium" },

    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

    location: { type: String },
    mediaUrl: { type: String },

    aiConfidence: { type: Number, default: 0.85 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
