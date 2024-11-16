module.exports = function createSuccessResponse(statusCode, data, response) {
  response.status(statusCode);
  response.send({
      Status: 'Success',
      data,
  });
}