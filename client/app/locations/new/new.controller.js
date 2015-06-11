'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.newLocation = {};
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $http.get('/api/categories')
      .success(function (categories) {
        $scope.categories = categories;
      })
      .error(function (data, status) {
        console.log('Error!' + status);
        console.log(data);
      });

    $scope.addLocation = function (form) {
      $scope.submitted = true;

      if ($scope.newLocation === {}) {
        return;
      }

      //if (form.$valid) {
      $http.post('/api/locations', $scope.newLocation)
        .success(function (data, status) {
          console.log('Success!' + status);
          console.log(data);
          $scope.alerts.push({type: 'success', msg: 'New Location successfully added!'});
        })
        .error(function (data, status) {
          console.log('Error!' + status);
          $scope.alerts.push({type: 'danger', msg: 'Couln\'t add new location!'});
        });
      //}
    };

  })
  .controller('UploadCtrl', function ($scope) {
    var S3_SECRET_KEY = 'OAiEQA8MY7o+kGPhYIB9M4W1tqKQokTun2xZehsg',
        S3_ACCESS_KEY = 'AKIAJTIPCXDWAFSGFM3A',
        S3_BUCKET = ***REMOVED***,
        S3 = new AWS.S3({accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY, region: ***REMOVED***, signatureVersion: 'v4'});

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.urls = [];

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var params = {Bucket: S3_BUCKET, Key: 'images/' + file.name, ContentType: file.type, Body: file};
          S3.upload(params, function (err, data) {
            if (err) {
              console.log(err, err.stack);
            } else {
              $scope.urls.push(data.Location);
            }
          });
        }
      }
    };
  });




