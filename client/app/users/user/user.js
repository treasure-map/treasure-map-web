'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users/:id',
        templateUrl: 'app/users/user/user.html',
        controller: 'UserCtrl',
        authenticate: true
      });
  });
