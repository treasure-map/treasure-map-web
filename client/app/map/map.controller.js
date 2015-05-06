'use strict';

angular.module('treasuremapApp')
  	.controller('MapCtrl', function ($scope, $http) {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
      });
    }

    var style = [
      {
        'featureType': 'poi',
        'elementType': 'labels',
        'stylers': [
          { 'visibility': 'off' }
        ]
      },{
        'stylers': [
          { 'gamma': 0.4 }
        ]
      },{
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#21C2B8" }
        ]
      },{
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
          { "weight": 0.25 }
          
        ]
      },{
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#FF931E" }
        ]
      },{
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          { "weight": 0.25 }
        ]
      },{
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#39B54A" }
        ]
      }
    ];

    $scope.map = { center: { latitude: 52.5075419, longitude: 13.4251364 }, zoom: 14 };

    $scope.options = { styles: style };

    $scope.locations = [];

    $http.get('/api/locations').success(function(locations) {
      $scope.labels = '';
    	$scope.locations = locations;
    	 _.each($scope.locations, function(location){
    	 	location.coordinates.latitude = location.coordinates.lat;
    	 	location.coordinates.longitude = location.coordinates.lng;

        var link = location.details.name
          .toLowerCase()
          .replace(/[^\w\säöüß]/gi, '')
          .replace(/\s/g,'-')
          .replace(/--/g,'-')
          .replace(/ä/g,'ae')
          .replace(/ö/g,'oe')
          .replace(/ü/g,'ue')
          .replace(/ß/g,'ss');
        location.link = link;
    	 	location.title = location.details.name;
        location.street = location.address.street;
        location.zipcode = location.address.zipcode;
        location.city = location.address.city;
        location.category = location.details.category.name;
        location.duration = location.details.duration;
        location.id = location.details.category.id;
    	});
    });

 });
