ou3.controller('DataController', ['$scope','placer', 'uiGmapGoogleMapApi', function ($scope, placer, uiGmapGoogleMapApi) {
  $scope.mapLoaded = false;
  $scope.area = {};

  $scope.swiped = false

  $scope.$on('geocode', function (e, data) {
    $scope.locationData = data;
    $scope.area = placer.extract(data);
  });

  $scope.handleSwipe = function (e) {
    console.log("swipe", e)
  };


  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function (maps) {
    //more junk
    $scope.mapLoaded = true;
  });

}])