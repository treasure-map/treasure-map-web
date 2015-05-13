'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/locations/:id',
        templateUrl: 'app/locations/location/location.html',
        controller: 'LocationCtrl'
      });
  });
