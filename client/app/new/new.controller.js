'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.newLocation = {};

    $http.get('/api/categories')
      .success(function (categories) {
        $scope.categories = categories;
      })
      .error(function (data, status, headers, config) {
        console.log('Error!');
      });

    $scope.addLocation = function (form) {
      $scope.submitted = true;

      if ($scope.newLocation === {}) {
        return;
      }

      //if (form.$valid) {
      $http.post('/api/locations', $scope.newLocation)
        .success(function (data, status) {
          console.log('Success!' + status);
          console.log(data);
        })
        .error(function (data, status) {
          console.log('Error!' + status);
        });
      //}
    };

    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];


  });




