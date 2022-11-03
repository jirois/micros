import UserOtpVerification from "../models/OtpVerification.js";
import { emailVerificationTemp } from "./emailTempConfirmation.js";
import sendEmail from "./sendEmail.js";
import { StatusCode } from "http-status-codes";

const sendVerificationEmail = async ({ id, email }, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 90000)}`;
    const message = emailVerificationTemp(otp);
    const mailOption = {
      to: email,
      subject: "Verify Your Email Address",
      html: message,
    };
    const tempTime = 1000 * 60 * 5;
    const saltRound = 10;
    const hashOtp = await bcrypt.hash(otp, saltRound);
    const newOtpVerification = await new UserOtpVerification({
      otp: hashOtp,
      userId: id,
      createdAt: Date.now(),
      expiresAt: new Date(Date.now() + tempTime),
    });

    await newOtpVerification.save();
    await sendEmail(mailOption);
    res
      .status(StatusCode.CREATED)
      .json({ msg: "Email Sent!", data: { id, email } });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export default sendVerificationEmail;
