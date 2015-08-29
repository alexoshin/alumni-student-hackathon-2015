/**
 * Created by drew on 8/29/15.
 */
angular.module('starter.services').factory('geoService', function ($http, $cordovaGeolocation) {
  return {
    getlocation: function (callback) {
      $cordovaGeolocation.getCurrentPosition().then(function(position) {
        callback(position.coords.latitude, position.coords.longitude);
      })
    }
  }
})
