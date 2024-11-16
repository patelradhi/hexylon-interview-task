require('dotenv').config({ path: '../.env' });
const { app, logger } = require('./app');
const config = require('./config');
const http = require('http');
const server = http.createServer(app);

server.listen(config.service.port, config.service.host, () => {
  logger.info(`Server started at ${config.service.host}:${config.service.port}`);
});
