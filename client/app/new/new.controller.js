'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.newLocation = {};

    $scope.addLocation = function (form) {
      $scope.submitted = true;

      if ($scope.newLocation === {}) {
        return;
      }

      //if (form.$valid) {
        $http.post('/api/locations', $scope.newLocation).
          success(function(data, status, headers, config) {
            console.log('Success!');
          }).
          error(function(data, status, headers, config) {
            console.log('Error!');
          });
      //}
    };
  });
