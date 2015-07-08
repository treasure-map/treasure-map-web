'use strict';

angular.module('treasuremapApp')
  .controller('NavbarCtrl', function ($scope, $location, $modal, Auth, search) {
    $scope.menu = [{
      'title': 'Map',
      'link': '/'
    }, {
      'title': 'Locations',
      'link': '/locations'
    }, {
      'title': 'Users',
      'link': '/users'
    }, {
      'title': 'Friends',
      'link': '/friends'
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
  })
  .value('search', { searchTerm: '' });
