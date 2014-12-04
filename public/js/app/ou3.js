var ou3 = angular.module("ou3", ['uiGmapgoogle-maps'])
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
}]);

ou3.factory('geo', ['$window', function($window) {
  return $window.navigator.geolocation;


}]);


ou3.factory('places', ['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {

}]);