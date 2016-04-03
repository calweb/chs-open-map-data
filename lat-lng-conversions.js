// NAD 1983 StatePlane South Carolina FIPS 3900 Feet
// http://epsg.io/102733
proj4.defs("ESRI:102733","+proj=lcc +lat_1=32.5 +lat_2=34.83333333333334 +lat_0=31.83333333333333 +lon_0=-81 +x_0=609600.0000000001 +y_0=0 +datum=NAD83 +units=us-ft +no_defs");

// Neighborhood coord transforms

    var subdivLatLng = _.map(subDivData.features, function (item) {
      return {
        "type":"Feature",
        "id": item.id,
        "properties": item.properties,
        "geometry":{
          "type":"MultiPolygon",
          "coordinates": [[ fixBrokenPolygon.call(this, _.chain(item.geometry.coordinates)
                            .flattenDepth(2)
                            .map(function (el) {
                              return proj4('ESRI:102733').inverse(el);
                            }).value())
                          ]]
        }
      }
    });
    subDivData.features = subdivLatLng;

    function fixBrokenPolygon(arr) {
      var lastIdx = arr.length - 1;

      // hot mess! - but i have to check [lat, lng] are !equal
      if(!((arr[0][0] === arr[lastIdx][0]) && (arr[0][1] === arr[lastIdx][1]))) {
        arr.splice(lastIdx, 1, arr[0]);
      }

      return arr;
    }

// Parking Meter coord transforms

  var meterLatLng = _.map(parkingMetersData.features, function(item) {

    return {
       type: item.type,
       id: item.id,
       geometry_name: item.geometry_name,
       properties: item.properties,
       geometry: {
                 coordinates: proj4('ESRI:102733').inverse(item.geometry.coordinates),
                 type: item.geometry.type
                 }
      }

  });
  parkingMetersData.features = meterLatLng;
