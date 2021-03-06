'use strict';

angular.module('treasuremapApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      addFriend: {
        method: 'PUT',
        params: {
          controller:'addfriend'
        }
      },
      removeFriend: {
        method: 'PUT',
        params: {
          controller:'removefriend'
        }
      },
      locations: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'locations'
        }
      },
      me: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
