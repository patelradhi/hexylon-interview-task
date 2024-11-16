module.exports = function createErrorResponse(error, response) {
  response.status(error.status ?? 400);
  response.send({
      Status: 'Error',
      data: error.message,
  });
}