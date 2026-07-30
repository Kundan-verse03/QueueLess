const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "recruiter",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);