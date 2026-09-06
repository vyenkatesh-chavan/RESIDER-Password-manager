const mongoose = require("mongoose");

const vaultItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    appName: {
      type: String,
      required: true,
      trim: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    blockDays: {
      type: Number,
      required: true,
      min: 1,
    },

    submittedAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["blocked", "access"],
      default: "blocked",
    },

    blockEndsAt: {
      type: Date,
      required: true,
    },

    accessEndsAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VaultItem", vaultItemSchema);