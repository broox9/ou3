var ou3 = angular.module("ou3", ['swipe']);

ou3.factory('placer', [function () {

  var extract = function (data) {
    // *usually* aa1 = state aa2= county  sl1 = borough
    level_codes = [
      'neighborhood',
      'route',
      'postal_code',
      'postal_code_suffix',
      'locality',
      'sublocality_level_1',
      'administrative_area_level_1',
      'administrative_area_level_2'
    ];

    //console.log("raw data", data)
    return typeGrep(data,level_codes);

  };

  function typeGrep (data,level_codes) {
    //need to figure out how to find what failed
    var extractObj =  {};

    for(var i = 0, n = level_codes.length; i < n; i++) {
      var item = $.grep(data, function (d, idx) {
        return d.types[0] == level_codes[i]
      });
      if (item.length) {
        extractObj[level_codes[i]] = item[0]['long_name']
      }
    }

    //console.log("extracted Data", extractObj);
    return extractObj;
  }

  return {
    extract: extract
  }

}]);


ou3.factory('brooxMap', ['$q','$window', function ($q, $window) {
  var google = $window.google;
  var loadGoogleDefer = $q.defer();
  var mapLoadedDefer = $q.defer();
  var coordinates = {lat: 40.216339, lng: -74.741427};
  var map = null;
  var currentMarker = null;

  google.maps.event.addDomListener($window, 'load', googleLoaded);

  function googleLoaded () {
    loadGoogleDefer.resolve(true);
  }

  function initMap (canvas) {
    var mapOptions = {
      center: coordinates, //new $g.maps.LatLng($scope.position.latitude, $scope.position.longitude),
      zoom: 15,
      disableDefaultUI: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      streetViewControl:true
    };

    map = new google.maps.Map(canvas, mapOptions);
    mapLoadedDefer.resolve();
    setMarker();

    //return map;
  }

  function updateMap (coords) {
    //console.log("Coords", coords)
    //if (!coordinates.hasOwnProperty('k')) {
      //coordinates = new google.maps.LatLng(coords.latitude, coords.longitude)
    //} else {
      coordinates = coords;
    //}


    if(map) {
      map.setCenter(coordinates);
      setMarker();
    }
  };

  function setMarker () {
    if (currentMarker) {
      currentMarker.setMap(null)
    }

    currentMarker = new google.maps.Marker({
      position: coordinates,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "You are Here"
    })
  }

  return {
    loadGoogle: loadGoogleDefer.promise,
    mapLoaded: mapLoadedDefer.promise,
    google: google,
    initMap: initMap,
    updateMap: updateMap,
    LatLng: google.maps.LatLng,
    getMarker: function () { return currentMarker},
    getMap: function () { return map}
  }

}]);