ou3.controller('DataController', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
  $scope.name = "St Francis Hospital";
  $scope.mapLoaded = false;

  $scope.area = {
    city: "",
    zip: "",
    street: "",
    county: "",
    state: ""
  };

  $scope.$on('geocode', function (e, data) {
    console.log("rec'd geocode", data)


    $scope.area.city = data[2].long_name;
    $scope.area.zip = data[6].long_name;
    $scope.area.county = data[3].long_name;
    $scope.area.street = data[1].long_name;
    $scope.area.state = data[4].long_name;
    console.log("city",$scope.area.city);
  });


  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function (maps) {
    //more junk
    $scope.mapLoaded = true;
  });

}])