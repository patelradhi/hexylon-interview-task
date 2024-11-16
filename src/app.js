const config = require('./config');
const app = require('express')();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { randomUUID } = require('node:crypto')
const pino = require('pino');
const loggerMiddleware = require('pino-http');
const router = require('./routes');
const logger = pino.pino();

app.use(helmet());
app.use(cookieParser(config.cookie.secret));
app.use(cors(config.cors));
app.use(loggerMiddleware({
  logger: pino(),
  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers["x-request-id"]
    if (existingID) return existingID
    const id = randomUUID()
    res.setHeader('X-Request-Id', id)
    return id
  },
  useLevel: 'info',
}));
app.use(`/${config.service.endpoint}`, router);

module.exports = {
  logger,
  app,
};