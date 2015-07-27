'use strict';

angular.module('treasuremapApp')
  .controller('EditCtrl', function ($scope, $http, $timeout, uiGmapGoogleMapApi, Location, Lightbox, $stateParams) {
    uiGmapGoogleMapApi.then(function (maps) {
      $timeout(function () {
        //maps.event.trigger($scope.mapNew, 'resize');
        $scope.showMap = true;
      }, 100);
    });

    $scope.message = 'Hello';
    $scope.editLocation = Location.get({ id: $stateParams.id }, function() {
      $scope.mapNew.center = $scope.editLocation.coordinates;
      $scope.editLocation.details.category.url = $scope.editLocation.details.category.imgUrl;
      $scope.images = $scope.editLocation.details.pictures;
    });;

    $scope.openImage = function (index) {
      Lightbox.openModal($scope.images, index);
    };

    console.log($scope.editLocation);
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
          $scope.editLocation.address.zipcode = zipcode ? zipcode.short_name : '';
          $scope.editLocation.address.city = city ? city.long_name : '';
          $scope.editLocation.address.street = street ? street.long_name : '';
          $scope.editLocation.address.street += number ? ' ' + number.short_name : '';

          $scope.editLocation.coordinates = {
            lat: $scope.place.geometry.location.lat(),
            latitude: $scope.place.geometry.location.lat(),
            lng: $scope.place.geometry.location.lng(),
            longitude: $scope.place.geometry.location.lng()
          };
          $scope.mapNew.center = $scope.editLocation.coordinates;
        }
      }
    };

    $scope.removePicture = function(pic) {
      var index = $scope.editLocation.details.pictures.indexOf(pic);
      $scope.editLocation.details.pictures.splice(index, 1);
      console.log($scope.editLocation.details.pictures);
    };

    $http.get('/api/categories')
      .success(function (categories) {
        $scope.categories = categories;
      })
      .error(function (data, status) {
        console.log('Error!' + status);
        console.log(data);
      });

    $scope.setCategory = function (category) {
      $scope.editLocation.details.category = category;
      $scope.editLocation.details.category.url = category.imgUrl;
    };

    $scope.addLocation = function (form) {
      $scope.submitted = true;

      if ($scope.editLocation === {}) {
        return;
      }

      if (form.$valid && $scope.editLocation.coordinates) {
        $scope.editLocation.details.category = $scope.editLocation.details.category._id;
        console.log($scope.editLocation);
        $http.put('/api/locations/' + $scope.editLocation._id, $scope.editLocation, { headers: { 'Content-Type': 'application/json'}})
          .success(function (data, status) {
            console.log('Success! ' + status);
            console.log(data);
            $scope.alerts.push({type: 'success', msg: 'New Location successfully added!'});

            $scope.editLocation = {};

            $http.get('/api/categories/'+data.details.category)
              .success(function (category) {
                data.details.category = category;
                $scope.$close(data);
              });
          })
          .error(function (data, status) {
            console.log('Error!' + status);
            $scope.alerts.push({type: 'danger', msg: 'Couln\'t edit location!'});
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
              $scope.editLocation.details.pictures.push(data.Location);
            }
          });
        }
      }
    };

  });
