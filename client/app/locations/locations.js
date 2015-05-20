'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locations', {
        title: 'Locations',
        url: '/locations',
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsCtrl'
      });
  });
