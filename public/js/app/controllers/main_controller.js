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
    //set scope vars
    $scope.geocoder = new brooxMap.google.maps.Geocoder();
    $scope.mapCanvas = document.querySelector('#map-canvas');
    $scope.position = {lat:40.216339, lng: -74.741427};  //default coords


    $scope.updatePosition = function () {
      $window.navigator.geolocation.getCurrentPosition(function (location) {
        $scope.position = new brooxMap.LatLng(location.coords.latitude, location.coords.longitude);
        brooxMap.updateMap($scope.position);
        console.log("location")
        $scope.geocoder.geocode({'latLng': $scope.position}, handleGeoCode);
      })
    };

    $scope.updatePosition();


    //make sure google service is loaded
    brooxMap.loadGoogle.then(function () {
      $scope.map = brooxMap.initMap($scope.mapCanvas);
    });

    function handleGeoCode (data) {
      if (data.length && data[0]['address_components']) {
        $scope.$broadcast('geocode', data[0]['address_components'])
      }
    }

}])