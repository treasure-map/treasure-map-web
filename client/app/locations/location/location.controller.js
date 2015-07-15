'use strict';

angular.module('treasuremapApp')
  .controller('LocationCtrl', function ($scope, $stateParams, Location, Auth, Lightbox, $modal) {
    $scope.location = Location.get({ id: $stateParams.id }, function() {
      $scope.map.center.latitude = $scope.location.coordinates.latitude;
      $scope.map.center.longitude = $scope.location.coordinates.longitude;
      $scope.location.details.category.url = $scope.location.details.category.imgUrl;
      $scope.images = $scope.location.details.pictures;
    });

    $scope.openImage = function (index) {
      Lightbox.openModal($scope.images, index);
   };

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.openModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'app/locations/edit/edit.html',
        controller: 'EditCtrl',
        size: size
      });

      modalInstance.result.then(function (editLocation) {
        $scope.location = editLocation;

        $scope.location.coordinates.latitude = editLocation.coordinates.latitude;
        $scope.location.coordinates.longitude = editLocation.coordinates.longitude;
        $scope.map.center = $scope.location.coordinates;
        //editLocation.cluster = {
        //  styles: { url: 'assets/images/Cluster.png' }
        //};
        //
        $scope.location.details.category.url = editLocation.details.category.imgUrl;

        //
        //$scope.locations.push(editLocation);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

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

          var result = CryptoJS.HmacSHA1(message + ' ' + timestamp, DISQUS_SECRET);
          var hexsig = CryptoJS.enc.Hex.stringify(result);

          return {
            key: DISQUS_PUBLIC,
            auth: message + ' ' + hexsig + ' ' + timestamp
          };
        }

        var hash = disqusSignon(Auth.getCurrentUser());

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
