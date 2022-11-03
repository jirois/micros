import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticate.js";
import User from "../models/User.js";
import sendVerificationEmail from "../utils/sendVerifcationEmail.js";
import UserOtpVerification from "../models/OtpVerification.js";
import bycpt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser.js";
import Token from "../models/Token.js";
import { attachCookiesToResponse } from "../utils/jwt.js";

const regiser = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exist");
  }

  const isFirstAccount = (await User.document({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  await sendVerificationEmail(user, res);
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      throw new BadRequestError("Empty otp not allowed");
    } else {
      const otpRecords = await UserOtpVerification.find({ userId });

      if (otpRecords.length <= 0) {
        throw new BadRequestError(
          "Account record doesn't exist or the user already verify account. please sign up or log in"
        );
      } else {
        const { expiresAt } = otpRecords[0];
        const hashedOtp = otpRecords[0].otp;
        if (expiresAt < Date.now()) {
          await UserOtpVerification.deleteMany({ userId });
          throw new UnAuthenticatedError("Code has expired, resend code again");
        } else {
          const validOtp = await bycpt.compare(opt, hashedOtp);
          if (!validOtp) {
            throw new BadRequestError("Invalid code, provide a valid code");
          } else {
            await User.updateOne(
              { _id: userId },
              { isVerified: true, verified: Date.now() }
            );
            await UserOtpVerification.deleteMany({ userId });
            res.status(StatusCodes.OK).json({ msg: "Email Verified" });
          }
        }
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const resendOtpVerification = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      throw new BadRequestError("Empth otp are not allowed");
    } else {
      await UserOtpVerification.deleteMany({ userId });
      await sendVerificationEmail({ _id: userId, email }, res);
      res.status(StatusCodes.OK).json({ msg: "Code is resend to your email" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  if (!user.isVerified) {
    throw new UnAuthenticatedError("Please verify your email");
  }

  const tokenUser = createTokenUser(user);
  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({
      res,
      user: tokenUser,
      refreshToken,
    });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  refreshToken = randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
