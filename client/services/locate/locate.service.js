'use strict';

angular.module('treasuremapApp')
  .service('Locator', function ($q) {
     return {
        locate: function () {
         var deferred = $q.defer();
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(pos) {
             deferred.resolve(pos.coords);
           });
         } else {
            deferred.reject();
           console.log('No support of geolocation');
         }
         return deferred.promise;
      }
    };
  });
