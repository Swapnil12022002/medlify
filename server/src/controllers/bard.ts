/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Bard from "../models/Bard";
import User from "../models/User";
import GenerateMessage from "../../utils/bardapi";
import { StatusCodes } from "http-status-codes";

interface AuthRequest extends Request {
  user?: { _id: ObjectId };
}

export const NewBardChatCtrl = async (req: AuthRequest, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "No question provided" });
  }
  const answer = await GenerateMessage(question, []);
  try {
    const newChat = await Bard.create({
      chat: [{ question, answer }],
      user: req.user?._id,
    });
    await User.findByIdAndUpdate(req.user?._id, {
      $push: { AIChat: newChat._id },
    });
    return res.status(StatusCodes.OK).json({ success: true, data: newChat });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const ContinueBardChatCtrl = async (req: AuthRequest, res: Response) => {
  const { bardId } = req.params;
  const { question } = req.body;
  const foundChats = await Bard.findById(bardId);
  if (!foundChats) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: "No chat found with this id" });
  }
  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "No question provided" });
  }
  const answer = await GenerateMessage(question, foundChats.chat);
  try {
    foundChats.chat.push({ question, answer });
    await foundChats.save();
    return res.status(StatusCodes.OK).json({ success: true, data: foundChats });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const GetSingleBardChatCtrl = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bardId } = req.params;
    const foundChat = await Bard.findById(bardId);
    if (!foundChat) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "No chat found with this id" });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: foundChat });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const GetAllChatsCtrl = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUser = await User.findById(req.user?._id).populate("AIChat");
    return res.status(StatusCodes.OK).json({
      success: true,
      data: loggedInUser?.AIChat,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
