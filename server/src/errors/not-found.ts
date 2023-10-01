import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
