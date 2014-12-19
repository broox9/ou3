ou3.controller('DataController', ['$scope','placer', 'brooxMap', function ($scope, placer, brooxMap) {
  $scope.mapLoaded = false;
  $scope.area = {
    locality: "here"
  };

  $scope.swiped = false;

  $scope.$on('geocode', function (e, data) {
    $scope.locationData = data;
    $scope.area = placer.extract(data);
    console.log("broox is here", $scope.area)
  });

  $scope.handleSwipe = function (e) {
    console.log("swipe", e)
  };


  brooxMap.loadGoogle.then(function () {
    $scope.mapLoaded = true;
  });

}])