const { healthCheck } = require("../controller");
const { registerUser, loginUser, updateUser } = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const createSuccessResponse = require("../utils/create-success-response");

module.exports = function ({ router }) {
  router.get("/health-check", healthCheck);

  router.post("/register", registerUser({ createSuccessResponse }));
  router.post("/login", loginUser({ createSuccessResponse }));
  router.put("/user", authMiddleware, updateUser({ createSuccessResponse }));
};
