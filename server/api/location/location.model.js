'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
	address: {
		street: String,
		city: String,
		zipcode: String
	},
	coordinates: {
		lat: Number,
		lng: Number
	},
  	details: {
  		name: String,
  		category: { 
  			type: Schema.ObjectId,
  			ref: 'Category'
  		},
  		description: String,
  		pictures: [String],
  		duration: Number
  	}
});

module.exports = mongoose.model('Location', LocationSchema);