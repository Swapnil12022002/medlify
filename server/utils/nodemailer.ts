import nodemailer, { Transporter } from "nodemailer";
import env from "../utils/validateEnv";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: env.EMAIL,
    pass: env.PASS,
  },
});

export default transporter;
export { MailOptions };