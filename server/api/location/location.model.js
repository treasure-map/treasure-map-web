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
    longitude: Number,
    latitude: Number
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
LocationSchema.index({ coordinates: '2dsphere'});

module.exports = mongoose.model('Location', LocationSchema);
