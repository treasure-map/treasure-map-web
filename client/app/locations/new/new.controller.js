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
          console.log('Error!' + status);          $scope.alerts.push({type: 'danger', msg: 'Couln\'t add new location!'});
        });
      //}
    };

  })
  .controller('UploadCtrl', function ($scope, Upload) {
    var getExpiryTime;

    getExpiryTime = function () {
      var date = new Date();
      return '' + (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' +
        (date.getDate() + 1) + 'T' + (date.getHours() + 3) + ':' + '00:00.000Z';
    };

    var S3_SECRET_KEY = 'OAiEQA8MY7o+kGPhYIB9M4W1tqKQokTun2xZehsg',
        S3_ACCESS_KEY = 'AKIAJTIPCXDWAFSGFM3A',
        S3_BUCKET = ***REMOVED***,
        S3_POLICY = {
      'expiration': getExpiryTime(),
      'conditions': [
      {'bucket': S3_BUCKET},
      {'acl': 'private'},
      ['content-length-range', 0, 5242880],
    ]};

    var s3 = new AWS.S3({accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY, region: ***REMOVED***, signatureVersion: 'v4'});

    var policy_string = JSON.stringify(S3_POLICY);
    var policy_base64 = window.btoa(policy_string);

    var signature = CryptoJS.HmacSHA1(policy_base64, 'AWS4' + S3_SECRET_KEY);
    var signature_base64 = window.btoa(signature);

    /*
    var signatureString = JSON.stringify(S3_POLICY);
    var timestamp = Math.round(+new Date() / 1000);
    var message = window.btoa(signatureString);

    var result = CryptoJS.HmacSHA1(message, S3_SECRET);
    var hexsig = CryptoJS.enc.Hex.stringify(result);
    var S3_SIGNATURE = message + ' ' + hexsig + ' ' + timestamp;
    */

    console.log(signature_base64);

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'https://' + S3_BUCKET + '.s3.amazonaws.com',
            method: 'POST',
            transformRequest: function (data, headersGetter) {
              var headers = headersGetter();
              delete headers['Authorization'];
              return data;
            },
            fields : {
              key: file.name,
              AWSAccessKeyId: S3_ACCESS_KEY,
              acl: 'private',
              policy: policy_base64,
              signature: signature_base64,
              'Content-Type': file.type !== '' ? file.type : 'application/octet-stream',
              filename: file.name
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    };
  });




