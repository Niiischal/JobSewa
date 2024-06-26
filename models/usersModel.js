const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobSeeker", "jobProvider", "admin"],
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    verificationToken: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    secretOTP: {
      type: String,
    },
    pdf: {
      type: [String],
      default: [],
    },
    isJobSaved: {
      type: Boolean,
      default: false,
    },
    isJobApplied: {
      type: Boolean,
      default: false,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
      },
    ],
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.role !== "jobSeeker") {
    // If not a jobSeeker, remove these properties
    this.pdf = undefined;
    this.savedJobs = undefined;
    this.appliedJobs = undefined;
    this.isJobSaved = undefined;
    this.isJobApplied = undefined;
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
