const config = require(`./${process.env.ENVIRONMENT ?? 'development'}.js`);
module.exports = config || {};