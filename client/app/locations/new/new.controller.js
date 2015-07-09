'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http, $timeout, uiGmapGoogleMapApi, Auth) {
    uiGmapGoogleMapApi.then(function (maps) {
      $timeout(function () {
        //maps.event.trigger($scope.mapNew, 'resize');
          $scope.showMap = true;
      }, 100);
    });

    $scope.message = 'Hello';
    $scope.newLocation = {
      details: {
        pictures : []
      }
    };
    $scope.alerts = [];

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.mapNew = {
      control: {},
      center: {
        latitude: 52.5075419,
        longitude: 13.4251364
      },
      zoom: 16,
      options: {
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true,
        draggable: false
      }
    };
    $scope.searchbox = {
      template: 'searchbox.tpl.html',
      events: {
        places_changed: function (searchBox) {
          $scope.place = searchBox.getPlaces()[0];

          var zipcode = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'postal_code'); });
          var city = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'administrative_area_level_1') || _.contains(i.types, 'locality'); });
          var street = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'route'); });
          var number = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'street_number'); });
          $scope.newLocation.address.zipcode = zipcode ? zipcode.short_name : '';
          $scope.newLocation.address.city = city ? city.long_name : '';
          $scope.newLocation.address.street = street ? street.long_name : '';
          $scope.newLocation.address.street += number ? ' ' + number.short_name : '';

          $scope.newLocation.coordinates = {
            lat: $scope.place.geometry.location.lat(),
            latitude: $scope.place.geometry.location.lat(),
            lng: $scope.place.geometry.location.lng(),
            longitude: $scope.place.geometry.location.lng()
          };
          $scope.mapNew.center = $scope.newLocation.coordinates;
        }
      }
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

      if (form.$valid && $scope.newLocation.coordinates) {
         var name = encodeURI($scope.newLocation.details.name);
         $http.jsonp('//de.wikipedia.org/w/api.php?action=query&titles=' + name + '&format=json&callback=JSON_CALLBACK')
         .success(function(obj) {
           var pageID = Object.keys(obj.query.pages)[0];
           $http.jsonp('//de.wikipedia.org/w/api.php?action=query&pageids=' + pageID + '&prop=info&inprop=url&format=json&callback=JSON_CALLBACK')
           .success(function(data) {
             //var link = data.query.pages.pageid.fullurl;
             console.log(link);
             //$scope.newLocation.details.links = link;
          })
          .error(function (data, status) {
            console.log('Error!' + status);
            console.log(data);
          });
         })
         .error(function (data, status) {
           console.log('Error!' + status);
           console.log(data);
         });

        $http.post('/api/locations', $scope.newLocation)
          .success(function (data, status) {
            console.log('Success! ' + status);
            console.log(data);
            $scope.alerts.push({type: 'success', msg: 'New Location successfully added!'});

            $scope.newLocation = {};

            $http.get('/api/categories/' + data.details.category)
              .success(function (category) {
                data.details.category = category;
                $scope.$close(data);
              });
          })
          .error(function (data, status) {
            console.log('Error!' + status);
            $scope.alerts.push({type: 'danger', msg: 'Couln\'t add new location!'});
          });
      } else {
        form.$valid = false;
      }
    };

    var S3_BUCKET = ***REMOVED***;
    var creds = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: ***REMOVED***,
    });

    AWS.config.update({
      region: ***REMOVED***,
      credentials: creds
    });

    // TODO: User Auth for Cognito
    /*
    if(Auth.isLoggedIn){
      if(Auth.getCurrentUser().provider == 'local'){
         console.log(Auth.getToken());
         //userLoggedIn('treasuremapApp', Auth.getToken());
         userLoggedIn('treasuremap-stage.herokuapp.com', Auth.getToken());
      } else {
         userLoggedIn(Auth.getCurrentUser().provider, Auth.getToken());
      }
   }

    function userLoggedIn(providerName, token) {
      creds.params.Logins = {};
      creds.params.Logins[providerName] = token;
      creds.expired = true;
      creds.refresh(function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
   }*/

    var S3 = new AWS.S3({region: ***REMOVED***});

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var filename = CryptoJS.MD5(file) + '.' + file.name.split('.').pop();
          var params = {Bucket: S3_BUCKET, Key: 'images/' + filename, ContentType: file.type, Body: file};
          S3.upload(params, function (err, data) {
            if (err) {
              console.log(err, err.stack);
            } else {
              $scope.newLocation.details.pictures.push(data.Location);
            }
          });
        }
      }
    };
  });
