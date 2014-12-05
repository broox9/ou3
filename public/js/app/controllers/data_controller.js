ou3.controller('DataController', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
  $scope.name = "St Francis Hospital";
  $scope.mapLoaded = false;

  $scope.area = {
    hood: "",
    city: "",
    zip: "",
    street: "",
    county: "",
    state: ""
  };

  $scope.locationData = [];

  function typeGrep (type) {
    var info = $.grep($scope.locationData, function (item) {
      return item.types[0] == type;
    });

    console.log("grepped info", type, info)
    try {
      return info[0]['long_name']
    } catch (error) {
      return ''
    }
  }

//  function localityGrep(typeArr) {
//    var txt = '';
//
//    for (var i = 0, n = typeArr.length; i < n; i++) {
//      var text = $.grep($scope.locationData, function (item) {
//        try {
//          return item.types[0] == type;
//        } catch(err) {
//          return '';
//        }
//      });
//      if (text.length) {
//        txt = text;
//      }
//    }
//
//    return txt;
//  }

  $scope.$on('geocode', function (e, data) {
    console.log("rec'd geocode", data)
    $scope.locationData = data;

    $scope.area.hood = typeGrep('neighborhood');
    $scope.area.city = typeGrep('locality') || '';
    $scope.area.zip = typeGrep('postal_code');
    $scope.area.county = typeGrep('administrative_area_level_2');
    $scope.area.street = typeGrep('route');
    $scope.area.state = typeGrep('administrative_area_level_1');
    console.log("city",$scope.area.hood);
  });


  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function (maps) {
    //more junk
    $scope.mapLoaded = true;
  });

}])