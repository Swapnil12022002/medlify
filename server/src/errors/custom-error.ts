abstract class CustomAPIError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}

export default CustomAPIError;
