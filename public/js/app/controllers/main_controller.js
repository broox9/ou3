ou3.controller('MainController', ['$scope', 'geo','uiGmapGoogleMapApi', function ($scope, geo, uiGmapGoogleMapApi) {
  $scope.defaultStart = {latitude: 40.216339, longitude: -74.741427};
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.currentPosition = $scope.defaultStart;

  $scope.mapInst = {};

  $scope.updatePosition = function () {
    geo.getLocation(updateLocation, showLocationError);
  }

  $scope.map = {
    center: $scope.defaultStart,
    zoom: 15,
    refresh: false,
    control: {} //gets methods added by the whatchamacallit. custom methods can be added
  };


  function updateLocation (location) {
    $scope.currentPosition = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    $scope.mapInst = $scope.map.control.getGMap();
    $scope.map.control.refresh(location.coords);
    $scope.areaDetails = $scope.geocoder.geocode({'latLng': $scope.currentPosition}, handleGeoCode)
  }

  function showLocationError (error) {
    console.log("Loc Error, loc", error)
    return $scope.defaultStart;
  }

  function handleGeoCode (data) {
    console.log("handling GeoCoding", data);

    if (data.length && data[0]['address_components']) {
      console.log("broadcasting geocode")
      $scope.$broadcast('geocode', data[0]['address_components'])
    }
  }

  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function (maps) {
    $scope.geocoder = new maps.Geocoder();
    geo.getCurrentPosition(updateLocation, showLocationError);
    $scope.map.refresh = true;
  });

}])