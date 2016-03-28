'use strict';

const mongoose = require('../../config/mongoose');

const twittSchema = new mongoose.Schema({
  twittId: { type: String, unique: true },
  text: String,

  name: String,
  screenName: String,
  avatar: String,

  retwitt: { type: Boolean, default: false },

  retweetCount: Number,
  favoriteCount: Number,
  inReplyTo: String,

  entities: Object,

  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

twittSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Twitt', twittSchema);
