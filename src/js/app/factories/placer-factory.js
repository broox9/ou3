angular.module('ou3')
.factory('placer', ['LEVEL_CODES', function (LEVEL_CODES) {
  var extract = function (data) {
    return typeGrep(data, LEVEL_CODES);
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

    return extractObj;
  }

  return {
    extract: extract
  }

}]);
