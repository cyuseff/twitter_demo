'use strict';

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/twitter-test';

// if(process.env.NODE_ENV == 'production') dbURI = process.env.MONGOLAB_URI;

/** Events **/
mongoose.connection
	.on('connected', function() {
		console.log('Mongoose connected to: ' + dbURI);
	})
	.on('error', function(err) {
		console.log('Mongoose connected error: ' + err);
	})
	.on('disconected', function() {
		console.log('Mongoose disconected');
	});

mongoose.connect(dbURI);

module.exports = mongoose;
