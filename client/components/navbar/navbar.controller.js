'use strict';

angular.module('treasuremapApp')
  .controller('NavbarCtrl', function ($scope, $location, $modal, Auth, search) {
    $scope.menu = [{
      'title': 'Map',
      'link': '/',
      'icon':'glyphicon-globe'
    }, {
      'title': 'Feed',
      'link': '/feed',
      'icon':'glyphicon-bullhorn'
    }, {
      'title': 'Friends',
      'link': '/friends',
      'icon':'glyphicon-user'
    }, {
      'title': 'Locations',
      'link': '/locations',
      'icon':'glyphicon-map-marker'
    }];

    $scope.search = search;
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };

    $scope.showSidebar = false;
    $scope.copyright = new Date().getFullYear();
  })
  .value('search', { searchTerm: '' });
