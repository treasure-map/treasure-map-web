'use strict';

angular.module('treasuremapApp')
  	.controller('MapCtrl', function ($scope, $http) {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 14 };
      });
    }

    $scope.map = { center: { latitude: 52.5075419, longitude: 13.4251364 }, zoom: 14 };

    $scope.locations = [];

    $http.get('/api/locations').success(function(locations) {
    	$scope.locations = locations;
    	 _.each($scope.locations, function(location){
    	 	location.coordinates.latitude = location.coordinates.lat;
    	 	location.coordinates.longitude = location.coordinates.lng;
    	});
    });

 });
