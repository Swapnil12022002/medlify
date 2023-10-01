import User from "../models/User";
import asyncHandler from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(`User already exists with email : ${email}`);
  }
  const newUser = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: "true",
    message: "User created successfully",
    newUser,
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
  console.log(token);

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
