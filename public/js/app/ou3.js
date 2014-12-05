var ou3 = angular.module("ou3", ['uiGmapgoogle-maps', 'ngTouch'])
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
}]);


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