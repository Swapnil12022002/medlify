import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnAuthenticatedError extends CustomAPIError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
  }
}

export default UnAuthenticatedError;
