'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locations.location', {
        url: '/:id',
        views: {
          '@': {
            templateUrl: 'app/locations/location/location.html',
            controller: 'LocationCtrl'
          }
        }
      });
  });
