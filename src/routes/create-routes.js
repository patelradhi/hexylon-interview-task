const { healthCheck } = require("../controller");

module.exports = function ({
  router,
}) {
  router.get(`/health-check`, healthCheck);
}