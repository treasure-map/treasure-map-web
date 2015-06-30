'use strict';

angular.module('treasuremapApp')
.controller('UserCtrl', function ($scope, $stateParams, Auth, User) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.user = User.get({ id: $stateParams.id }, function () {
    console.log($scope.user);
    });
  });
