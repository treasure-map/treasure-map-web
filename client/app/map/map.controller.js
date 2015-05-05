'use strict';

angular.module('treasuremapApp')
  	.controller('MapCtrl', function ($scope, $http) {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 14 };
      });
    }

    var style = [
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "stylers": [
          { "gamma": 0.4 }
        ]
      }
    ]

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
        location.zipcode = location.address.zipcode
        location.city = location.address.city;
        location.category = locations.details.category.name;
        location.duration = location.details.duration;
    	});
    });

 });
