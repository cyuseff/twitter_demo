'use strict';

const router = require('express').Router();
const twittsController = require('../controllers/TwittsController');

router.route('/twitts')
  .get(twittsController.list);

module.exports = function(app) {
  app.use('/api/v1', router);
};
