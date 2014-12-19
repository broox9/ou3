ou3.controller('DataController', ['$scope','placer', 'brooxMap', function ($scope, placer, brooxMap) {
  $scope.mapLoaded = false;
  $scope.swiped = false;
  $scope.area = {};

  $scope.$on('geocode', function (e, data) {
    $scope.locationData = data;
    $scope.dataUpdate(placer.extract(data));
  });

  $scope.handleSwipe = function (e) {
    console.log("swipe", e)
  };


  brooxMap.loadGoogle.then(function () {
    $scope.mapLoaded = true;
  });

  $scope.dataUpdate = function (data) {
    for (d in data) {
      console.log(d, data[d])
      $scope.area[d] = data[d];
    }
  }

}])