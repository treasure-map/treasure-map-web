'use strict';

angular.module('treasuremapApp')
  .controller('LocationsCtrl', function ($scope, Location) {
    $scope.locations = Location.query();

  });
