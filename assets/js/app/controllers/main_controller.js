ou3.controller('MainController', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
  $scope.defaultStart = {latitude: 40.216339, longitude: -74.741427};

  $scope.map = {
    center: $scope.defaultStart,
    zoom: 8
  }


  //once the map API is loaded..
  uiGmapGoogleMapApi.then(function () {
    //more junk

    console.log("Map Stuff!!")
  });

}])