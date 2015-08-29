angular.module('starter.controllers', []);


angular.module('starter.controllers').controller('DashCtrl', function ($scope, $ionicPlatform, gmApiService, geoService, warnService, mgfService, settingsService, $interval, $timeout, $cordovaLocalNotification) {
    $scope.stations = {};
    $scope.cards = {
      takeABreak: false
    };

    $scope.openInMap = function(station){
      geoService.openInMap({
        address: station.address + ' ' + station.city + ' ' + station.region + ' ' + station.station,
        type: 'address'
      });
    };

    $ionicPlatform.ready(function () {
      $scope.refreshInterval = settingsService.getRefresh();
      var getServices = function () {
        console.log($scope.refreshInterval);
        geoService.getLocation().then(function (coordinates) {
          mgfService.search(coordinates.latitude, coordinates.longitude).then(function (results) {
            console.log(results.stations);
            $scope.stations = results.stations;

          });
        });
        console.log($scope.refreshInterval);
        $scope.refreshInterval = settingsService.getRefresh();
      };
      getServices();
      $interval(getServices, $scope.refreshInterval);
    });

    geoService.getLocation().then(function (coordinates) {
      console.log('coordinates:', coordinates);
    }, function (error) {
      console.error(error);
    });

    $scope.refresh = function () {
      $timeout(function () {
        // fake it for now
        $scope.$broadcast('scroll.refreshComplete');
      }, 2000);
    };

    $ionicPlatform.ready(function () {

      warnService.warn().then(
        function () {
          $scope.scheduleSingleNotification = function () {
            $cordovaLocalNotification.schedule({
              id: new Date().getTime(),
              title: 'Almost Time For a Break',
              text: 'Start considering places to pull off and take a break',
            });
          }
        });
      warnService.enforce().then(
        function() {
          $scope.cards.takeABreak = true;
          $scope.scheduleSingleNotification = function () {
            $cordovaLocalNotification.schedule({
              id: new Date().getTime(),
              title: 'Take a Break Now',
              text: 'For your safety and others, please take a break from driving',
            });
          }
        });
    });

  $scope.snooze = function () {
    $scope.cards.takeABreak = false;
    $timeout(function () {
      $scope.cards.takeABreak = true;
    }, 10000);
  };

  $scope.takeBreak = function () {
    $scope.cards.takeABreak = false;
    $timeout(function () {
      $scope.cards.takeABreak = true;
    }, 1000 * 60);
  };

});

angular.module('starter.controllers').controller('SettingsCtrl', function ($scope, settingsService) {
  $scope.refreshRates = settingsService.getRefreshRates();
  $scope.updateRefreshRate = function (newRate) {
    settingsService.setRefresh(newRate);
    console.log(newRate);
  };
});
