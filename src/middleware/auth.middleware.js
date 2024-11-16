const { UnAuthenticatedError } = require("../utils/errors");
const Redis = require("../utils/lib/redis");
const config = require("../config");

const redisClient = new Redis(config.redis);

const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      throw new UnAuthenticatedError("Authentication required");
    }

    const sessionData = await redisClient.get(sessionId);
    if (!sessionData) {
      throw new UnAuthenticatedError("Invalid or expired session");
    }

    try {
      req.user = JSON.parse(sessionData);
    } catch (error) {
      throw new UnAuthenticatedError("Invalid session data");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
