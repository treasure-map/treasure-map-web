'use strict';

angular.module('treasuremapApp')
  .controller('MapCtrl', function ($scope, $http) {
    $scope.map = { center: { latitude: 52.460531, longitude: 13.521875 }, zoom: 8 };
  });
