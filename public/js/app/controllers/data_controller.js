ou3.controller('DataController', [
  '$scope',
  'placer',
  'brooxMap', function ($scope, placer, brooxMap) {
  $scope.mapLoaded = false;
  $scope.area = {};

  $scope.$on('geocode', function (e, data) {
    $scope.area = placer.extract(data);
    $scope.$apply(); //i know i know i have to refactor this

  });

  $scope.handleVerticalSwipe = function (direction) {
    var toCollapse = true;
    if (direction === "up") {
      toCollapse = false;
    }
    $scope.$emit('set_mini_lock', toCollapse);
  };

  $scope.handleUpdatePosition = function () {
    console.log("handleUpdatePosition Called", arguments)
  }


  brooxMap.mapLoaded.then(function (map) {
    $scope.mapLoaded = true;
  });

}])