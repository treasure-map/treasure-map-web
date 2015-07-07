'use strict';

angular.module('treasuremapApp')
.controller('UserCtrl', function ($scope, $stateParams, Auth, User) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.user = User.get({ id: $stateParams.id });
    $scope.locations = User.locations({ id: $stateParams.id });

    $scope.addFriend = function (user) {
      Auth.addFriend(user._id).then( function() {
        $scope.currentUser.friends.push(user._id);
        console.log('Friend added');
      });
    };

    $scope.removeFriend = function (user) {
      Auth.removeFriend(user._id).then( function() {
        $scope.currentUser.friends.splice($scope.currentUser.friends.indexOf(user._id), 1);
        console.log('Friend removed');
      });
    };
  });
