const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String, 
      required: true,
    },
    sender: {
      type: String,
      enum: ["customer", "agent"],
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
