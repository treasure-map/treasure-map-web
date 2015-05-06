'use strict';

angular.module('treasuremapApp')
  .controller('CategoriesCtrl', function ($scope, $http) {
    $http.get('/api/categories').success(function(categories) {
      $scope.categories = categories;
    });
  });
