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
    }
  }
})
