'use strict';

angular.module('treasuremapApp')
  .factory('Location', function ($resource) {
    return $resource('/api/locations/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
