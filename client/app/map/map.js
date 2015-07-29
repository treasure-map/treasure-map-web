'use strict';

angular.module('treasuremapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      })
      .state('map.location', {
        templateUrl: 'app/map/map.location.html',
        controller: 'LocationCtrl',
        params: {
          id: 'id'
        }
      })
      .state('map.locations', {
        templateUrl: 'app/map/map.locations.html',
        controller: 'LocationsCtrl'
      })
      .state('map.friends', {
        templateUrl: 'app/map/map.feed.html',
        controller: 'FriendsCtrl'
      })
      .state('map.users', {
        templateUrl: 'app/map/map.users.html',
        controller: 'UsersCtrl'
      });
  });
