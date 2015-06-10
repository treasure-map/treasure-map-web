'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http, $timeout, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function (maps) {
      $timeout(function () {
        //maps.event.trigger($scope.mapNew, 'resize');
          $scope.showMap = true;
      }, 100);
    });

    $scope.message = 'Hello';
    $scope.newLocation = {};
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
        $http.post('/api/locations', $scope.newLocation)
          .success(function (data, status) {
            console.log('Success! ' + status);
            console.log(data);
            $scope.alerts.push({type: 'success', msg: 'New Location successfully added!'});

            $scope.newLocation = {};

            $http.get('/api/categories/'+data.details.category)
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

  });




