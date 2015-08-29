/**
 * Created by drew on 8/29/15.
 */
angular.module('starter.services').factory('mgfService', function($http, $q) {
  var apiKey = 'ooqlwgi6kb';
  return {
    search: function(lat, long) {
      var url = "http://api.mygasfeed.com/stations/radius/"+lat+"/"+long+"/5/reg/distance/"+apiKey+".json"
      console.log(url)
      var res = $http.get(url);

      return $q(function (resolve, reject) {
        res.then(function (resp) {
          return resolve(resp.data);
        }, function (err) {
          console.error(err.status);
          console.error(err.statusText);
          reject(err);
        })
      });
    }
  }
});
