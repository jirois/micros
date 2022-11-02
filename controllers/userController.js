import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermission.js";
import BadRequestError from "../errors/bad-request.js";
import { attachCookiesToResponse } from "../utils/jwt";
import UnAuthenticatedError from "../errors/unauthenticate";

const getAllUser = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new NotFoundError(`User with the Id: ${req.params.id} not found`);
  }

  checkPermissions(req.user, user._id);
};

const showCurrentUser = () => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email && !name) {
    throw new BadRequestError("Please provide email/name");
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword && !newPassword) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Successful, Passwod updated!" });
};

export {
  getAllUser,
  showCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
};
