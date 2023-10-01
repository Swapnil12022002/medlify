import env from "../../utils/validateEnv";
import { Response, Request, NextFunction } from "express";
import { UnAuthenticatedError } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: object;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError(
      "You are not authorized to access this route"
    );
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new UnAuthenticatedError("No user found with this id");
  }
  req.user = user;
  next();
};

export default authMiddleware;
