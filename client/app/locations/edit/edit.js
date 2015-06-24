'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/locations/edit/:id',
        templateUrl: 'app/locations/edit/edit.html',
        controller: 'EditCtrl',
        authenticate: true
      });
  });
