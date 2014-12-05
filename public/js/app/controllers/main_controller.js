ou3.controller('MainController', [
  '$scope',
  '$window',
  'uiGmapGoogleMapApi',
  function ($scope, $window, uiGmapGoogleMapApi) {
    //default to St. Francis Hospital ... where I started **rimshot**
    $scope.position = {latitude: 40.216339, longitude: -74.741427};

    $scope.updatePosition = function () {
      $window.navigator.geolocation.getCurrentPosition(updateLocation, showLocationError);
    }

    $scope.map = {
      center: $scope.position,
      zoom: 15,
      disableDefaultUI: true,
      streetViewControl: true,
      scaleControl: false,
      mapTypeControl: false,
      refresh: false,
      controlOpts: {} //gets methods added by the whatchamacallit. custom methods can be added
    };


    function updateLocation (location) {
      $scope.position = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      $scope.geocoder.geocode({'latLng': $scope.position}, handleGeoCode);

      try {
        $scope.map.controlOpts.panTo(location.coords);
        setMarker(location)
      } catch (error) {
        console.log("there is an error with refresh")
      }
    }

    function setMarker (loc) {
     console.log("they got get map yo?", $scope.map.controlOpts, loc.timestamp);
     $scope.marker = {
      idKey: loc.timestamp,
      position: $scope.position,
      map: $scope.map.controlOpts.getGMap()
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
      $scope.map_service = maps;
      $scope.geocoder = new maps.Geocoder();

      $scope.map.refresh = true;
      //return maps;
    }).then(function (maps) {
      //console.log("Next promise", maps);
      $window.navigator.geolocation.getCurrentPosition(updateLocation, showLocationError);
    });

}])