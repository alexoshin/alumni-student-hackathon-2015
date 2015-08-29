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
      var getServices = function () {
        geoService.getLocation().then(function (coordinates) {
          mgfService.search(coordinates.latitude, coordinates.longitude).then(function (results) {
            console.log(results.stations);
            $scope.stations = results.stations;

          });
        });
      };
      getServices();
      $interval(getServices, settingsService.getRefresh());
    });

    $ionicPlatform.ready(function() {
      $interval(function () {

      }, 1000 * 60);
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
  };

  $scope.takeBreak = function () {
    $scope.cards.takeABreak = false;
  };

});

angular.module('starter.controllers').controller('SettingsCtrl', function ($scope) {

});
