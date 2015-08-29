/**
 * Created by tituswoo on 8/29/15.
 */
angular.module('starter.services').factory('gmApiService', function ($http) {
  return {
    authenticate: function () {
      var id = "l7xxb1ace3b4c4454f1a9ec7a30b69c850f6";
      var secret = "5d41035a5619413d8cebe6eb1c4bd9eb";
      var url = "https://developer.gm.com/api/v1/oauth/access_token";
      var headers = {
        "Authorization": "Basic " + btoa(id + ":" + secret),
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      }

      var res = $http.get(url, {headers: headers})

      res.then(function (resp) {
        console.log(resp)
      }, function (err) {
        console.error(err)
      })
    }
  };
});
