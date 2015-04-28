/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var location = require('../api/location/location.model');
var Category = require('../api/category/category.model');

Category.find({}).remove(function() {
  Category.create({
    name : 'Geocaches',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Sights & Culture',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Food & Drink',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Leisure',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Shopping',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Accommodation',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  }, {
    name : 'Other',
    imgUrl : 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
  });
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});


location.find({}).remove(function() {
    location.create({
      address: {
        street: '112 rue du Faubourg Saint-Honore',
        city: 'Paris',
        zipcode: '75008'
      },
      coordinates: {
        lat: 48.8718282, 
        lng: 2.31499899
      },
      details: {
        name: 'Epicure',
        //category: Category.findBy{ Name, "Food & Drink"},
        description: '',
        pictures: ['',''],
        duration: 2
      }
    }, function() {
    console.log('finished populating locations');
    });
  });
