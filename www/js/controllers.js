angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, gmApiService, geoService) {
    gmApiService.authenticate();
    geoService.getLocation().then(function (coordinates) {
      console.log('coordinates:', coordinates);
    }, function (error) {
      console.error(error);
    });
  })

.controller('ChatsCtrl', function($scope, Chats, $ionicPlatform, $cordovaGeolocation, mgfService) {
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

    $ionicPlatform.ready(function () {
      console.log('HELLO THERE');
      var info = $cordovaGeolocation.getCurrentPosition();
      info.then(function (position) {
        console.log('position:', position);
        console.log(position.coords.latitude, position.coords.longitude);
        mgfService.search(position.coords.latitude, position.coords.longitude).then(function (results) {
          console.info(results.stations);
        }, function (error) {
          console.error('SOMETHING BAD HAPPENED OMG', error);
        });
      });
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
