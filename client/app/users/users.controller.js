'use strict';

angular.module('treasuremapApp')
  .controller('UsersCtrl', function ($scope, User, Auth) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.users = User.query();

    console.log($scope.users);
  });
