'use strict';

angular.module('treasuremapApp')
  	.controller('MapCtrl', function ($scope, $http, Auth, $modal, search, $filter) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.search = search;

    $scope.$watch("search.searchTerm", function(searchTerm){
      $scope.filteredMarkers = $filter("filter")($scope.locations, searchTerm);
      if (!$scope.filteredMarkers){
        return;
      }
      console.log($scope.filteredMarkers);
    });

    $scope.openModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'app/locations/new/new.html',
        controller: 'NewCtrl',
        size: size
      });

      modalInstance.result.then(function (newLocation) {
        newLocation.cluster = {
          styles: { url: 'assets/images/Cluster.png' }
        };
        $scope.map = { center: newLocation.coordinates, zoom: 15 };


        newLocation.icon = {
          url: newLocation.details.category.imgUrl
        };

        $scope.locations.push(newLocation);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    var style = [
      {
        'featureType': 'poi',
        'elementType': 'labels',
        'stylers': [
          { 'visibility': 'off' }
        ]
      },{
        'stylers': [
          { 'gamma': 0.5 },
          { 'saturation': -1 }
        ]
      },{
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'color': '#21C2B8' }
        ]
      },{
        'featureType': 'water',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'weight': 0.25 }

        ]
      },{
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'color': '#FF931E' }
        ]
      },{
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'weight': 0.25 }
        ]
      },{
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'color': '#39B54A' }
        ]
      }
    ];

    var cluster = {
        title: 'Hi I am a Cluster!',
        gridSize: 60,
        ignoreHidden: true,
        minimumClusterSize: 2,
        imageExtension: 'png',
        imagePath: 'assets/images/Cluster',
        imageSizes: [72]
      };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function(pos) {
        var currPos = pos.coords;

        $scope.$apply(function () {
          $scope.userLocation = {
            latitude: currPos.latitude,
            longitude: currPos.longitude
          };
          $scope.map = {
            center: { latitude: currPos.latitude, longitude: currPos.longitude },
            zoom: 14
          };
        });
        $scope.getLocations($scope.userLocation, $scope.searchRadius);
      });
    }else{
      $scope.getLocations($scope.map.center, $scope.searchRadius);
      console.log('No support of geolocation');
    }

    $scope.map = { center: { latitude: 52.5075419, longitude: 13.4251364 }, zoom: 14 };
    $scope.options = { styles: style };
    $scope.map.clusterOptions = angular.toJson(cluster);
    $scope.searchRadius = 5;
    $scope.userLocation = $scope.map.center;


    $scope.locations = [];

    $scope.getLocations = function(coords, distance) {
      $http.get('/api/locations', {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          distance: distance
        }
      }).success(function(locations) {
        $scope.labels = '';
        $scope.locations = locations;
        _.each($scope.locations, function(location){

        //var link = location.details.name
        //  .toLowerCase()
        //  .replace(/[^\w\säöüß]/gi, '')
        //  .replace(/\s/g,'-')
        //  .replace(/--/g,'-')
        //  .replace(/ä/g,'ae')
        //  .replace(/ö/g,'oe')
        //  .replace(/ü/g,'ue')
        //  .replace(/ß/g,'ss');

        //location.link = location._id;
    	 //	location.title = location.details.name;
        //location.street = location.address.street;
        //location.zipcode = location.address.zipcode;
        //location.city = location.address.city;
        //location.category = location.details.category.name;
        //location.duration = location.details.duration;
        //location.id = location.details.category._id;

          location.cluster = {
            styles: { url: 'assets/images/Cluster.png' }
          };

          location.icon = {
            url: location.details.category.imgUrl,
            // size: new google.maps.Size(50, 62),
            // origin: new google.maps.Point(0,0),
            // anchor: new google.maps.Point(0, 17)
          };

        });
      });
    };
 });
