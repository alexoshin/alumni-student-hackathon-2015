/**
 * Created by drew on 8/29/15.
 */
angular.module('starter.services').factory('mgfService', function($http) {
  return {
    search: function(lat, long) {
      var url = "http://api.mygasfeed.com/stations/radius/"+lat+"/"+long+"/5/reg/distance/ooqlwgi6kb.json"
      var res = $http.get(url).then(function(resp) {
        console.log('Success', resp);
      }, function(err) {
        console.error('Error', err);
      });
    }
  }
})
