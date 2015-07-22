'use strict';

angular.module('treasuremapApp')
  .controller('UsersCtrl', function ($scope, User, Auth) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.isFriend = Auth.isFriend;
    $scope.users = User.query();

    console.log($scope.users);
  });
