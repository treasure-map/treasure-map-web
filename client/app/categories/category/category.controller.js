'use strict';

angular.module('treasuremapApp')
  .controller('CategoryCtrl', function ($scope, $stateParams, $http) {
    $http.get('/api/categories/'+$stateParams.id).success(function(category) {
      $scope.category = category;

      $http.get('/api/categories/'+$stateParams.id+'/locations').success(function(locations) {
        $scope.locations = locations;
      });
    });
  });
