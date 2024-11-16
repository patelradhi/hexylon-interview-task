module.exports = function ({
  createSuccessResponse,
}) {
  return (_, res) => {
    createSuccessResponse(200, 'Server is healthy.', res);
  }
}