'use strict';

var _ = require('lodash');
var Location = require('./location.model');

var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal
var extra = {
  apiKey: ***REMOVED***, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
var request = require('request');

// Get list of locations
exports.index = function(req, res) {
  Location.find()
    .populate('details.category')
    .exec(function (err, locations) {
      if(err) { return handleError(res, err); }
      return res.json(200, locations);
    });
  //Location.find(function (err, locations) {
  //  if(err) { return handleError(res, err); }
  //  return res.json(200, locations);
  //});
};

// Get a single location
exports.show = function(req, res) {
  Location.findById(req.params.id)
    .populate('details.category')
    .exec(function(err, location) {
      if(err) { return handleError(res, err); }
      if(!location) { return res.send(404); }
      return res.json(location);
    });
};

// Creates a new location in the DB.
exports.create = function(req, res) {
  // no coordindates? ask the mighty geocoder
  //console.log(req.body);
  if(!req.body.coordinates && req.body.address) {
    var address = req.body.address;
    geocoder.geocode(address.street + ', ' + address.zipcode + ' ' + address.city)
      .then(function(addr) {
        if (addr.length > 1) {
          return res.status(400).json({ error: 'unprecise address' });
        }

        req.body.coordinates = {
          lat: addr[0].latitude,
          lng: addr[0].longitude
        };

        Location.create(req.body, function(err, location) {
          if(err) { return handleError(res, err); }
          return res.json(201, location);
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    Location.create(req.body, function(err, location) {
      if(err) { return handleError(res, err); }
      if (process.env.DOMAIN) sendLocationToSlack(location, 'created');
      return res.json(201, location);
    });
  }
};

// Updates an existing location in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Location.findById(req.params.id, function (err, location) {
    if (err) { return handleError(res, err); }
    if(!location) { return res.send(404); }
    var updated = _.merge(location, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      if (process.env.DOMAIN) sendLocationToSlack(location, 'updated');
      return res.json(200, location);
    });
  });
};

// Deletes a location from the DB.
exports.destroy = function(req, res) {
  Location.findById(req.params.id, function (err, location) {
    if(err) { return handleError(res, err); }
    if(!location) { return res.send(404); }
    location.remove(function(err) {
      if(err) { return handleError(res, err); }
      if (process.env.DOMAIN) sendLocationToSlack(location, 'deleted');
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function sendLocationToSlack(location, method) {
  request({
    method: 'POST',
    url: ***REMOVED***,
      body: JSON.stringify({
        "text": "A new location has been " + method + "! <" + process.env.DOMAIN + "/locations/" + location._id + "|Click here> for details!",
        "username": "New Location Bot",
        "icon_emoji": ":round_pushpin:"
      })
  }, function (error, response, body) {
    if (error) {
      return console.error('sending message to Slack failed:', error);
    }
    console.log('sending message to Slack successful!  Server responded with:', body);
  });
}
