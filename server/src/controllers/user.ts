import User from "../models/User";
import asyncHandler from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import env from "../../utils/validateEnv";
import transporter, { MailOptions } from "../../utils/nodemailer";
import crypto from "crypto";

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(`User already exists with email : ${email}`);
  }
  const newUser = await User.create(req.body);
  const token = newUser.generateToken();
  res.status(StatusCodes.CREATED).json({
    success: "true",
    message: "User created successfully",
    newUser,
    token,
  });
});

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const loggedInUser = await User.findOne({ email });
  if (!loggedInUser) {
    throw new UnAuthenticatedError(`No account found with email : ${email}`);
  }
  const isPasswordCorrect = await loggedInUser.matchPassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Incorrect password");
  }
  const token = loggedInUser.generateToken();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
});

export const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ success: true, users });
});

export const getUserByIdCtrl = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new BadRequestError(`No user found with id: ${userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, user });
});

export const forgotPasswordCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError(`No user found with email : ${email}`);
  }
  const resetToken = user.generateResetPasswordToken();
  const resetUrl = `You can reset your password by clicking on this link. \n\n <a href = "${
    req.protocol
  }://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}">Click here</a>`;
  const message: MailOptions = {
    from: env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: resetUrl,
  };
  await transporter.sendMail(message);
  await user.save({ validateBeforeSave: false });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Reset password link sent to your email",
    resetUrl,
  });
});

export const resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new BadRequestError("Invalid token");
  }
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Password reset successfully",
  });
});
