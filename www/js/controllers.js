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
          $scope.cards.takeABreak = true;
          $scope.scheduleSingleNotification = function () {
            $cordovaLocalNotification.schedule({
              id: new Date().getTime(),
              title: 'Test Notification',
              text: 'Stop Driving Soon'
            });
          };
        });
    });
  });

angular.module('starter.controllers').controller('SettingsCtrl', function ($scope) {

});
