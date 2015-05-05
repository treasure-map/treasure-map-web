'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/categories/:id',
        templateUrl: 'app/categories/category/category.html',
        controller: 'CategoryCtrl'
      });
  });