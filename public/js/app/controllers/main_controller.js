ou3.controller('MainController', [
  '$scope',
  '$window',
  '$document',
  'brooxMap',
  function ($scope, $window, $document, brooxMap) {
    //initial check
    if (!$window.navigator.geolocation) {
      alert("This isn't gonna work out :/");
    }

    var geocoder = new brooxMap.google.maps.Geocoder();
    var mapCanvas = document.querySelector('#map-canvas');

    $scope.position = {lat:40.216339, lng: -74.741427};  //default coords
    $scope.updatePosition = function () {
      $window.navigator.geolocation.getCurrentPosition(function (location) {
        $scope.position = new brooxMap.LatLng(location.coords.latitude, location.coords.longitude);
        brooxMap.updateMap($scope.position);
        geocoder.geocode({'latLng': $scope.position}, handleGeoCode);
      })
    };




    //make sure google service is loaded
    brooxMap.loadGoogle.then(function () {
      brooxMap.initMap(mapCanvas);
      $scope.updatePosition();
    });

    function handleGeoCode (data) {
      if (data.length && data[0]['address_components']) {
        $scope.$broadcast('geocode', data[0]['address_components'])
      }
    }

}])