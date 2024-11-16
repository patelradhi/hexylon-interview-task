const { UnknownError } = require("../utils/errors");
const createErrorResponse = require("../utils/create-error-response");

const errorHandler = (err, req, res, next) => {
  req.log.error(
    {
      err: {
        message: err.message,
        stack: err.stack,
        status: err.status
      }
    },
    "Request error"
  );

  if (res.headersSent) {
    return next(err);
  }

  const error = err.status ? err : new UnknownError(err.message || "Something went wrong");

  createErrorResponse(error, res);
};

module.exports = errorHandler;
