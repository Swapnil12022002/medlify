import {Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../utils/validateEnv";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
}

interface IUserMethods {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  generateToken: () => string;
  isModified: (path?: string | string[]) => boolean;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function (): string {
  return jwt.sign({ id: this._id }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default model<IUser, UserModel>('User', userSchema);
