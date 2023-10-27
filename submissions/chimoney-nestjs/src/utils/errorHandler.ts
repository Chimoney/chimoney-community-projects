import { HttpStatusCode } from 'axios';

class HttpException extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   * @param {number} statusCode HTTP status code. Default is 400
   */
  status: number;
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode || 400;
  }
}

const errorHandler = (error) => {
  const message = error.response ? error.response.data : error.message;
  const status = error?.response?.status
    ? error.response.status
    : error.code || HttpStatusCode.InternalServerError;
  return {
    error: message,
    status,
  };
};

export { HttpException, errorHandler };
