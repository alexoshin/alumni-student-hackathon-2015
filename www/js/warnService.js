/**
 * Created by drew on 8/29/15.
 */

angular.module('starter.services').factory('warnService', function ($q, $timeout) {

  var threshold = 1000 * 60;
  var warn = 1000 * 15;

  return {
    warn : function(){
      return $q(function(resolve, reject) {
        $timeout(function() {
          resolve();
        }, threshold - warn);
      })
    },
    enforce : function(){
      return $q(function(resolve, reject) {
        $timeout(function() {
          resolve();
        }, threshold);
      })
    }
  }
});
