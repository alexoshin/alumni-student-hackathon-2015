/**
 * Created by drew on 8/29/15.
 */
angular.module('starter.services').factory('geoService', function ($http, $cordovaGeolocation, $q) {
  return {
    getLocation: function () {
      return $q(function (resolve, reject) {
        $cordovaGeolocation.getCurrentPosition().then(function(response) {
          resolve(response.coords);
        }, function (error) {
          reject(error);
        });
      });
    },
    openInMap: function (searchObj) {
      var mapUrl = '';

      if (searchObj.type === 'coordinate') {
        mapUrl = 'http://maps.google.com/maps?z=12&t=m&q=loc:'+coordinates.latitude+'+'+coordinates.longitude;
      }

      if (searchObj.type === 'address') {
        mapUrl = 'http://maps.google.com/maps?z=12&t=m&q=' + searchObj.address;
      }

      window.open(mapUrl);
    }
  };
});
