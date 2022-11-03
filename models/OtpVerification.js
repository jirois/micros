import mongoose from "mongoose";

const UserOtpVerificationSchema = new mongoose.Schema({
  otp: String,
  userId: String,
  createdAt: Date,
  expiresDate: Date,
});

export default mongoose.model("UserOtpVerification");
