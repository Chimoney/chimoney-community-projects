const createApiError = (message = "Internal Server Error", errorCode = 500) => {
  // Create a new error object
  const error = new Error(message);

  // Append the error code property to it
  error.apiErrorCode = errorCode;

  // Return new error
  return error;
};

const handleAsync = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      res
        .status(error.apiErrorCode || 500)
        .json({ message: error.message, success: false });
    }
  };
};

module.exports = { createApiError, handleAsync };
