'use strict';

angular.module('treasuremapApp')
  .controller('LocationCtrl', function ($scope, $stateParams, Location, Auth) {
    $scope.location = Location.get({ id: $stateParams.id }, function() {
      $scope.map.center.latitude = $scope.location.coordinates.lat;
      $scope.map.center.longitude = $scope.location.coordinates.lng;
      $scope.location.latitude = $scope.location.coordinates.lat;
      $scope.location.longitude = $scope.location.coordinates.lng;
    });

    $scope.user = Auth.getCurrentUser;

    $scope.map = {
      center: {
        latitude: 52.5167,
        longitude: 13.3833
      },
      zoom: 15,
      pan: false,
      options: {
        scrollwheel: false,
        draggable: true,
        disableDefaultUI: true
      }
    };
  });
