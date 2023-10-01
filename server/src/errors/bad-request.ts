import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomAPIError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
