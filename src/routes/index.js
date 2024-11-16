const { Router } = require('express');

const createRoutes = require('./create-routes');
const router = Router({
  mergeParams: true,
});

createRoutes({ router });
module.exports = router;