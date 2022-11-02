import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api";

class UnAuthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnAuthorizedError;
