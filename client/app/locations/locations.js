'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locations', {
        url: '/locations/:title',
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsCtrl'
      });
  });