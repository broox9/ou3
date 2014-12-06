ou3.controller('MainController', [
  '$scope',
  '$window',
  'uiGmapGoogleMapApi',
  function ($scope, $window, uiGmapGoogleMapApi) {
    //default to St. Francis Hospital ... where I started **rimshot**
    $scope.position = {latitude: 40.216339, longitude: -74.741427};

    $scope.marker = {
      idKey: Date.now(),
      coords: {
        latitude: $scope.position.latitude,
        longitude: $scope.position.longitude
      },
      map: {} //$scope.map.controlOpts.getGMap()
    }

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
        $scope.map.controlOpts.refresh(location.coords);
        setMarker(location)
      } catch (error) {
        console.log("there is an error with refresh")
      }
    }

    function setMarker (loc) {
//      console.log("setting marker")
//      var myLatLng = new $scope.map_service.LatLng(loc.coords.latitude, loc.coords.longitude)
//      var map = $scope.map.controlOpts.getGMap();
//
//      var marker = new $scope.map_service.maps.Marker({
//        position: myLatLng,
//        map: map,
//        title: 'Hello World!'
//      });
//
//      console.log('Marker', marker, myLatLng)

    }

    function showLocationError (error) {
      console.log("Loc Error, loc", error)
      return $scope.position;
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