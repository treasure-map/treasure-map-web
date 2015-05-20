'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        title: 'Category',
        url: '/categories/:id',
        templateUrl: 'app/categories/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
