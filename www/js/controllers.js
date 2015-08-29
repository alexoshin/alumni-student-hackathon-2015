angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform, gmApiService, geoService, $cordovaGeolocation, mgfService) {
    //gmApiService.authenticate();
    $scope.stations = {};

    $ionicPlatform.ready($interval(function() {
      geoService.getLocation().then(function (coordinates) {
        mgfService.search(coordinates.latitude, coordinates.longitude).then(function (results) {
          console.log(results.stations);
          $scope.stations = results.stations;

        });
      });
    }, 1000));

    geoService.getLocation().then(function (coordinates) {
      console.log('coordinates:', coordinates);
    }, function (error) {
      console.error(error);
    });
  })

.controller('ChatsCtrl', function($scope, Chats, $ionicPlatform, $cordovaGeolocation, mgfService, geoService, $interval) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
