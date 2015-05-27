'use strict';

angular.module('treasuremapApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'ngFileUpload',
  'ngStorage'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })

  .controller('UploadCtrl', function ($scope, Upload) {
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    /*
    $scope.policy = {
      'expiration': '2016-03-01T00:00:00Z',
      'conditions': [
        {'bucket': ***REMOVED***},
        ['starts-with', '$key', 'images/'],
        {'acl': 'private'},
        //{'success_action_redirect': 'http://localhost/'},
        ['starts-with', '$Content-Type', ''],
        ['content-length-range', 0, 5242880]
      ]
    };

    $scope.signature = CryptoJS.HmacSHA1( CryptoJS.enc.Base64.stringify( $scope.policy ), 'OAiEQA8MY7o+kGPhYIB9M4W1tqKQokTun2xZehsg' );
    console.log('sha1 ' + $scope.signature); */

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'https://treasure-map.s3.amazonaws.com/',
            method: 'POST',
            fields : {
              key: file.name,
              AWSAccessKeyId: 'AKIAJTIPCXDWAFSGFM3A',
              acl: 'private',
              policy: CryptoJS.enc.Base64.stringify( $scope.policy ),
              signature: CryptoJS.enc.Base64.stringify( $scope.signature ),
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
