ou3.controller('DataController', ['$scope','placer', 'brooxMap', function ($scope, placer, brooxMap) {
  $scope.mapLoaded = false;
  $scope.swiped = false;
  $scope.area = {};

  $scope.$on('geocode', function (e, data) {
    $scope.area = placer.extract(data);
    $scope.$apply(); //i know i know i have to refactor this

  });

  $scope.handleSwipe = function (e) {
    console.log("swipe", e)
  };


  brooxMap.mapLoaded.then(function (map) {
    $scope.mapLoaded = true;
  });

}])