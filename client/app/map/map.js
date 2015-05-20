'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        title: 'Home',
        url: '/',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      });
  });
