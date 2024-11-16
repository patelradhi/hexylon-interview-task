module.exports = function createErrorResponse(error, response) {
  const status = error.status || 500;
  response.status(status);
  response.json({
    status: "Error",
    code: status,
    message: error.message,
    // Only include error details in development
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
      details: error.details // if any additional error details exist
    })
  });
};
