'use strict';

angular.module('treasuremapApp')
  .factory('Category', function ($resource) {
    return $resource('/api/categories/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
