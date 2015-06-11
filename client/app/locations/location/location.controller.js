'use strict';

angular.module('treasuremapApp')
  .controller('LocationCtrl', function ($scope, $stateParams, Location) {
    $scope.location = Location.get({ id: $stateParams.id }, function() {
      $scope.map.center.latitude = $scope.location.coordinates.lat;
      $scope.map.center.longitude = $scope.location.coordinates.lng;
      $scope.location.latitude = $scope.location.coordinates.lat;
      $scope.location.longitude = $scope.location.coordinates.lng;
    });

    $scope.map = {
      center: {
        latitude: 52.5167,
        longitude: 13.3833
      },
      zoom: 15,
      pan: false,
      options: {
        scrollwheel: false,
        draggable: true,
        disableDefaultUI: true
      }
    };
  })
    .controller('DisqusCtrl', function ($scope, $stateParams, Auth) {
        var DISQUS_SECRET = ***REMOVED***,
            DISQUS_PUBLIC = ***REMOVED***,
            DISQUS_SHORTNAME = ***REMOVED***,
            BASEURL = 'http://treasuremap-stage.herokuapp.com';

        function disqusSignon(user) {
          var disqusData = {
            id: user._id,
            username: user.name,
            email: user.email
          };

          var disqusStr = JSON.stringify(disqusData);
          var timestamp = Math.round(+new Date() / 1000);

          var message = window.btoa(disqusStr);

          var result = CryptoJS.HmacSHA1(message + " " + timestamp, DISQUS_SECRET);
          var hexsig = CryptoJS.enc.Hex.stringify(result);

          return {
            key: DISQUS_PUBLIC,
            auth: message + " " + hexsig + " " + timestamp
          };
        }

        var hash = disqusSignon(Auth.getCurrentUser());
        console.log(Auth.getCurrentUser());
        console.log(hash.auth);
        console.log(hash.key);

        var disqus_config = function () {
          this.page.remote_auth_s3 = hash.auth;
          this.page.api_key = hash.key;
          this.sso = {
            name:   'TreasureMap',
            button: BASEURL + '/assets/images/yeoman.png',
            icon:   BASEURL + '/assets/images/yeoman.png',
            url:    BASEURL + '/login',
            logout: BASEURL + '/logout',
            width:  '800',
            height: '400'
          };
        };

        (function() {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = '//' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    });

