ou3.controller('DataController', [
  '$scope',
  'placer',
  'brooxMap',
  '$window',
  function ($scope, placer, brooxMap, $window) {
  $scope.mapLoaded = false;
  $scope.area = {};

  $scope.$on('geocode', function (e, data) {
    $scope.area = placer.extract(data);
    $scope.$apply(); //i know i know i have to refactor this

  });

  $scope.toggleMiniLock = function () {
    console.log("toggling")
    $scope.$emit('toggle_mini_lock');
  };

  $scope.handleUpdatePosition = function () {
    console.log("handleUpdatePosition Called", arguments, Date.now())
    $scope.$emit('update_position')
  };

  $scope.reload = function () {
    $window.location.reload();
  };


  brooxMap.mapLoaded.then(function (map) {
    $scope.mapLoaded = true;
  });

}])