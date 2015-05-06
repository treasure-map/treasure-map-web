'use strict';

angular.module('treasuremapApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/map'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $( '#menu' ).click(function() {
      $( '.sidebar-nav' ).toggleClass( 'isVisible' );  
      if( $( '.sidebar-nav' ).hasClass( 'isVisible' ) ) {  
        $( this ).html( '&#10005;' );
      } else {
        $( this ).html( '&#9776;' );    
      }
    });

  });