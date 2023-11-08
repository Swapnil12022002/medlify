import { Schema, model, Model, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../utils/validateEnv";
import crypto from "crypto";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
  AIChat: ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface IUserMethods {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  generateToken: () => string;
  isModified: (path?: string | string[]) => boolean;
  generateResetPasswordToken: () => string;
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
    AIChat: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bard",
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
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

userSchema.methods.generateResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;
  return resetToken;
};

export default model<IUser, UserModel>("User", userSchema);
