'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.newLocation = {};
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $http.get('/api/categories')
      .success(function (categories) {
        $scope.categories = categories;
      })
      .error(function (data, status) {
        console.log('Error!' + status);
        console.log(data);
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
          $scope.alerts.push({type: 'success', msg: 'New Location successfully added!'});
          window.location.reload();

        })
        .error(function (data, status) {
          console.log('Error!' + status);          $scope.alerts.push({type: 'danger', msg: 'Couln\'t add new location!'});
        });
      //}
    };

  });




