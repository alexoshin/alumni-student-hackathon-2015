/**
 * Created by drew on 8/29/15.
 */

angular.module("starter.services").factory("settingsService", function() {
  var refreshRate = 10000;
  var timeStart = 0;
  var timeEnd = 0;

  var refreshRates = [
    1, 5, 10, 20
  ];

  return {
    setRefresh : function(refresh) {
      refreshRate = refresh * 1000;
    },
    getRefresh : function() {
      return refreshRate;
    },
    getRefreshRates: function () {
      return refreshRates;
    },
    startTrip : function() {
      timeStart = new Date().getTime();
      timeEnd = 0;
    },
    endTrip : function() {
      timeEnd = new Date().getTime();
    },
    tripTime : function() {
      if (timeEnd) {
        return timeEnd - timeStart;
      } else {
        return new Date().getTime() - timeStart;
      }
    }
  }
});
