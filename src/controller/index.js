const createSuccessResponse = require('../utils/create-success-response');

const makeHealthCheck = require('./makeHealthCheck');
const healthCheck = makeHealthCheck({
  createSuccessResponse: createSuccessResponse,
});

module.exports = {
  healthCheck,
}