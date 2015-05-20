'use strict';

angular.module('treasuremapApp')
  .controller('NavbarCtrl', function ($scope, $location, $modal, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Map',
      'link': '/map'
    }];

    $scope.openModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'app/locations/new/new.html',
        controller: 'NewCtrl'
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

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
  });
