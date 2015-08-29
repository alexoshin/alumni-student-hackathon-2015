angular.module('starter.controllers', [])


.controller('DashCtrl', function ($scope, $ionicPlatform, gmApiService, geoService, warnService, mgfService, settingsService, $interval, $timeout, $cordovaLocalNotification) {
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
  });

  /*
  .controller('ChatsCtrl', function ($scope, Chats, $ionicPlatform, $cordovaGeolocation, mgfService, geoService, $interval) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };

    function update() {
      geoService.getLocation().then(function (coordinates) {
        console.info('got the coordinates', coordinates);
        console.info('searching for gas stations near you...');
        mgfService.search(coordinates.latitude, coordinates.longitude).then(function (results) {
          console.log('stations found:', results.stations.length);
          console.log(results.stations);
          console.log('opening first result', results.stations[0]);
          geoService.openInMap(coordinates);
        });
      });

    }

    $ionicPlatform.ready($interval(update, 1000));
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
  */
