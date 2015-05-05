/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var location = require('../api/location/location.model');
var Category = require('../api/category/category.model');

var categories = [new Category({
  name: 'Geocaches',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Sights & Culture',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Food & Drink',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Leisure',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Shopping',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Accommodation',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
}), new Category({
  name: 'Other',
  imgUrl: 'http://zizaza.com/cache/big_thumb/iconset/581024/581034/PNG/512/map_marker/home_home_icon_map_marker_flat_icon_home_png_map_marker_icon_png.png'
})];

Category.find({}).remove(function () {
  Category.create(categories, function () {
      console.log('finished populating categories');
    }
  );
});

Thing.find({}).remove(function () {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function () {
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
  }, function () {
    console.log('finished populating users');
  });
});


location.find({}).remove(function () {
  location.create([{
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
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Paul-Lincke-Ufer 21',
      city: 'Berlin',
      zipcode: '10999'
    },
    coordinates: {
      lat: 52.4942,
      lng: 13.42957
    },
    details: {
      name: 'Restaurant VOLT',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 3
    }
  }, {
    address: {
      street: 'Marlene-Dietrich-Platz 2',
      city: 'Berlin',
      zipcode: '10785'
    },
    coordinates: {
      lat: 52.508116,
      lng: 13.372982
    },
    details: {
      name: 'Vox Restaurant',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 1.5
    }
  }, {
    address: {
      street: 'Poststraße 17',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.51631,
      lng: 13.40784
    },
    details: {
      name: 'Gasthaus Zur Rippe',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: "",
      pictures: "",
      duration: 4
    }
  }, {
    address: {
      street: 'Poststraße 28',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.517241,
      lng: 13.4064
    },
    details: {
      name: 'Zur Gerichtslaube',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 1
    }
  }, {
    address: {
      street: 'Köpenicker Straße 18-20',
      city: 'Berlin',
      zipcode: '10997'
    },
    coordinates: {
      lat: 52.505579,
      lng: 13.432972
    },
    details: {
      name: 'Sage Restaurant',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2.5
    }
  }, {
    address: {
      street: 'Am Treptower Park 14',
      city: 'Berlin',
      zipcode: '12435'
    },
    coordinates: {
      lat: 52.4904928,
      lng: 13.4578314
    },
    details: {
      name: 'Park Center Treptow',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Schnellerstraße 21',
      city: 'Berlin',
      zipcode: '12439'
    },
    coordinates: {
      lat: 52.45685,
      lng: 13.50842
    },
    details: {
      name: 'Zentrum Schöneweide',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 1.5
    }
  }, {
    address: {
      street: 'Frankfurter Allee 111',
      city: 'Berlin',
      zipcode: '10247'
    },
    coordinates: {
      lat: 52.5141263,
      lng: 13.4745089
    },
    details: {
      name: 'Ring-Center Berlin',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 3
    }
  }, {
    address: {
      street: 'Grunerstraße 20',
      city: 'Berlin',
      zipcode: '10179'
    },
    coordinates: {
      lat: 2.519187,
      lng: 13.41597
    },
    details: {
      name: 'Alexa Berlin',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 4
    }
  }, {
    address: {
      street: 'Bahnhofstraße 33-38',
      city: 'Berlin',
      zipcode: '12555'
    },
    coordinates: {
      lat: 52.4581599,
      lng: 13.57750229
    },
    details: {
      name: 'Forum Köpenick',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2.5
    }
  }, {
    address: {
      street: 'Pariser Platz',
      city: 'Berlin',
      zipcode: '10117'
    },
    coordinates: {
      lat: 52.5158566,
      lng: 13.3784283
    },
    details: {
      name: 'Brandenburg Gate',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 1
    }
  }, {
    address: {
      street: 'Bodestrasse 1-3',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.5194894,
      lng: 13.3988334
    },
    details: {
      name: 'Pergamon Museum',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2.5
    }
  }, {
    address: {
      street: 'Bernauer Strasse 111/119',
      city: 'Berlin',
      zipcode: '13355'
    },
    coordinates: {
      lat: 52.53523,
      lng: 13.38943
    },
    details: {
      name: 'Memorial of the Berlin Wall',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Platz der Republik',
      city: 'Berlin',
      zipcode: '11011'
    },
    coordinates: {
      lat: 52.518535,
      lng: 13.373188
    },
    details: {
      name: 'Reichstag',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2.5
    }
  }, {
    address: {
      street: 'Bodestrasse',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.5199172,
      lng: 13.3990756
    },
    details: {
      name: 'Museum Island',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2.5
    }
  }, {
    address: {
      street: 'Alexander Platz',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.521918,
      lng: 13.413215
    },
    details: {
      name: 'Alexanderplatz',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Strasse des 17. Juni 100',
      city: 'Berlin',
      zipcode: '10557'
    },
    coordinates: {
      lat: 52.512906,
      lng: 13.3267274
    },
    details: {
      name: 'Tiergarten',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Gendarmenmarkt',
      city: 'Berlin',
      zipcode: '10117'
    },
    coordinates: {
      lat: 52.513722,
      lng: 13.39267
    },
    details: {
      name: 'Gendarmenmarkt',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Panoramastrasse 1A',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.52086,
      lng: 13.4093
    },
    details: {
      name: 'Television Tower',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }, {
    address: {
      street: 'Trebbiner Strasse 9',
      city: 'Berlin',
      zipcode: '10963'
    },
    coordinates: {
      lat: 52.4986278,
      lng: 13.3768443
    },
    details: {
      name: 'German Museum of Technology',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 3
    }
  }, {
    address: {
      street: 'Spandauer Damm 20-24',
      city: 'Berlin',
      zipcode: '14059'
    },
    coordinates: {
      lat: 52.5242681,
      lng: 13.2918291
    },
    details: {
      name: 'Charlottenburg Palace',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 3
    }
  }, {
    address: {
      street: 'Karl-Liebknecht-Strasse 1',
      city: 'Berlin',
      zipcode: '10178'
    },
    coordinates: {
      lat: 52.519133,
      lng: 13.402634
    },
    details: {
      name: 'DDR Museum',
      category: categories[Math.floor((Math.random() * 7))]._id,
      description: '',
      pictures: ['', ''],
      duration: 2
    }
  }], function (err, locations) {
    console.log('finished populating locations');
  });
});
