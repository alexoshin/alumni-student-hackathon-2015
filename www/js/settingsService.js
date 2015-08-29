/**
 * Created by drew on 8/29/15.
 */

angular.module("starter.services").factory("settingsService", function() {
  var refreshRate = 10000;

  return {
    setRefresh : function(refresh) {
      refreshRate = refresh * 1000;
    },
    getRefresh : function() {
      return refreshRate;
    }
  }
});
