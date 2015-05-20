'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categories.category', {
        url: '/:id',
        views: {
          '@': {
            templateUrl: 'app/categories/category/category.html',
            controller: 'CategoryCtrl'
          }
        }
      });
  });
