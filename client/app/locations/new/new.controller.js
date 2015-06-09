'use strict';

angular.module('treasuremapApp')
  .controller('NewCtrl', function ($scope, $http) {
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
        zoomControl: true
      }
    };
    $scope.searchbox = {
      template: 'searchbox.tpl.html',
      events: {
        places_changed: function (searchBox) {
          $scope.place = searchBox.getPlaces()[0];
          $scope.newLocation.address.zipcode = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'postal_code'); }).long_name;
          $scope.newLocation.address.city = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'administrative_area_level_1'); }).long_name;
          $scope.newLocation.address.street = _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'route'); }).long_name + ' ' +
                                            + _.find($scope.place.address_components, function(i) { return _.contains(i.types, 'street_number'); }).long_name;
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
            $scope.$close(data);
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




