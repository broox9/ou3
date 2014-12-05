ou3.controller('MainController', ['$scope', 'geo','uiGmapGoogleMapApi', function ($scope, geo, uiGmapGoogleMapApi) {
  $scope.defaultStart = {latitude: 40.216339, longitude: -74.741427};
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.currentPosition = $scope.defaultStart;

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
    $scope.geocoder.geocode({'latLng': $scope.currentPosition}, handleGeoCode)

    try {
      $scope.map.control.refresh(location.coords);
    } catch (error) {
      console.log("there is an error with refresh")
    }
  }

  function showLocationError (error) {
    console.log("Loc Error, loc", error)
    return $scope.defaultStart;
  }

  function handleGeoCode (data) {
    if (data.length && data[0]['address_components']) {
      $scope.$broadcast('geocode', data[0]['address_components'])
    }
  }

  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function (maps) {
//    console.log("maps", maps)
    $scope.geocoder = new maps.Geocoder();


    $scope.map.refresh = true;
    return maps;
  }).then(function (maps) {
//    console.log("Next promise", maps);
    geo.getLocation(updateLocation, showLocationError);
  });

}])