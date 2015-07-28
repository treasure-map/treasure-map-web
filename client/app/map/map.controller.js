'use strict';

angular.module('treasuremapApp')
  	.controller('MapCtrl', function ($scope, $http, Auth, $modal, search, $filter, User, Lightbox, Locator, $timeout) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.currentUser = Auth.getCurrentUser();

    $scope.search = search;

    $scope.openImage = function (index, images) {
      Lightbox.openModal(images, index);
    };

    $scope.$watch("search.searchTerm", function(searchTerm){
      $scope.filteredLocations = $filter("filter")($scope.locations, searchTerm);
      if (!$scope.filteredLocations){
        return;
      }
    });

    $scope.openModal = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'app/locations/new/new.html',
        controller: 'NewCtrl',
        size: size
      });

      modalInstance.result.then(function(newLocation) {
        newLocation.cluster = {
          styles: {
            url: 'assets/images/Cluster.png'
          }
        };
        $scope.search.map = { center: newLocation.coordinates, zoom: 15 };

        newLocation.icon = {
          url: newLocation.details.category.imgUrl
        };

        //location.click = selectLocation;

        $scope.locations.push(newLocation);
      }, function() {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    var style = [{
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "color": "#666666"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "landscape.natural",
      "stylers": [{
        "gamma": 2.5
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "lightness": 25
      }, {
        "gamma": 1.2
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#FF931E"
      }, {
        "gamma": 1.5
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#f3f3f3"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#e9e9e9"
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#e3e3e3"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "gamma": 1.85
      }]
    }];

    var cluster = {
      title: 'Hi I am a Cluster!',
      gridSize: 60,
      ignoreHidden: true,
      minimumClusterSize: 2,
      imageExtension: 'png',
      imagePath: 'assets/images/Cluster',
      imageSizes: [72]
    };

    var locate = Locator.locate();
    locate.then( function(currPos) {
       $timeout(function() {
         $scope.$apply(function() {
           $scope.search.userLocation = {
             latitude: currPos.latitude,
             longitude: currPos.longitude
           };
           $scope.search.map = {
             center: {
               latitude: currPos.latitude,
               longitude: currPos.longitude
             },
             zoom: 14
           };
         });
         $scope.getLocations($scope.search.userLocation, $scope.searchRadius);
      });
   });

    $scope.search.map = {
      center: {
        latitude: 52.5075419,
        longitude: 13.4251364
      },
      zoom: 14
    };
    $scope.options = {
      styles: style
    };
    $scope.search.map.clusterOptions = angular.toJson(cluster);
    $scope.searchRadius = 25;
    $scope.search.userLocation = $scope.search.map.center;

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

        $scope.filteredLocations = $scope.locations;

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
            styles: {
              url: 'assets/images/Cluster.png'
            }
          };

          location.icon = {
            url: location.details.category.imgUrl,
            // size: new google.maps.Size(50, 62),
            // origin: new google.maps.Point(0,0),
            // anchor: new google.maps.Point(0, 17)
          };

          //location.click = selectLocation;

        });
      });
    };

    var clicked = false;

    $scope.markersEvents = {
      mouseover: function (gMarker, eventName, model) {
        clicked = false;
        model.show = true;
        $scope.$apply();
      },
      mouseout: function (gMarker, eventName, model) {
        model.show = clicked === true;
        $scope.$apply();
      },
      click: function (gMarker, eventName, model) {
        $scope.selectedLocation = $scope.selectedLocation === model ? null : model;
        $scope.$apply();
      }
    };

    $scope.friendsFilter = false;
    $scope.filterByFriends = function () {
      if ($scope.friendsFilter) {
        $scope.filteredLocations = [];

        for(var i = 0; i < $scope.currentUser.friends.length; i++) {
          $scope.currentUser.friends[i].locations = User.locations({ id: $scope.currentUser.friends[i]._id }, function (locations) {
            _.each(locations, function(location){
              location.cluster = { styles: { url: 'assets/images/Cluster.png' } };
              location.icon = { url: location.details.category.imgUrl };

              //location.click = selectLocation;
            });

            $scope.filteredLocations = $scope.filteredLocations.concat(locations);
          });
        }
      } else {
        $scope.filteredLocations = $scope.locations;
      }
    };
    $scope.myLocationsFilter = false;
    $scope.filterByMyLocations = function () {
      if ($scope.myLocationsFilter) {
        $scope.filteredLocations = [];

        $scope.currentUser.locations = User.locations({ id: $scope.currentUser._id }, function (locations) {
          _.each(locations, function(location){
            location.cluster = { styles: { url: 'assets/images/Cluster.png' } };
            location.icon = { url: location.details.category.imgUrl };

            //location.click = selectLocation;
          });

          $scope.filteredLocations = locations;
        });
      } else {
        $scope.filteredLocations = $scope.locations;
      }
    };

    function selectLocation (marker, event, location) {
      $scope.selectedLocation = $scope.selectedLocation ? null : location;
    }

    $scope.searchboxNav = {
      template: 'searchbox.tpl.html',
      events: {
        places_changed: function(searchBox) {
          $scope.place = searchBox.getPlaces()[0];

          var coordinates = {
            lat: $scope.place.geometry.location.lat(),
            latitude: $scope.place.geometry.location.lat(),
            lng: $scope.place.geometry.location.lng(),
            longitude: $scope.place.geometry.location.lng()
          };

          $scope.$apply(function() {
            $scope.search.userLocation = {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude
            };
            $scope.search.map = {
              center: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
              },
              zoom: 14
            };
          });
          $scope.getLocations($scope.search.userLocation, $scope.searchRadius);

        }
      }
    };

 });
