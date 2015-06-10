'use strict';

angular.module('treasuremapApp')
  .controller('LocationsCtrl', function ($scope, Auth, Location, $modal) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.locations = Location.query();

    $scope.openModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'app/locations/new/new.html',
        controller: 'NewCtrl',
        size: size
      });

      modalInstance.result.then(function (newLocation) {
        $scope.locations.push(newLocation);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

  });
