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
    pictures: [{ type: String, unique: true }],
    duration: Number,
    links: [{ type: String, unique: true }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  owner: { type: Schema.ObjectId, ref: 'User' }
});
LocationSchema.index({ coordinates: '2dsphere'});

module.exports = mongoose.model('Location', LocationSchema);
