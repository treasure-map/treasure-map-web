'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        title: 'Location',
        url: '/locations/:id',
        templateUrl: 'app/locations/location/location.html',
        controller: 'LocationCtrl'
      });
  });
