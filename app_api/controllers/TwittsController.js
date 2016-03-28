'use strict';

const Twitt = require('../models/Twitt');

module.exports.list = function(req, res) {
  let query = {};
  if(req.query.last) {
    query = {createdAt : { $gt : new Date(req.query.last) }}
  }

  Twitt.find(
    query,
    {},
    {
      sort: { 'createdAt': -1 },
      limit: 5
    },
  (err, twitts) => {
    res.status(200).json({twitts: twitts});
  })
};
