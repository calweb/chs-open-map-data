var _ = require('lodash');
var proj4 = require('proj4');

module.exports = {
  transformStatePlane: transformStatePlane,
  fixBrokenPolygon: fixBrokenPolygon
};
  function transformStatePlane(geojson, projection, isPolygon) {
    var transformedFeatures;

    if(isPolygon) {
      transformedFeatures = _.map(geojson.features, function (item) {
      return {
        type: item.type,
        id: item.id,
        geometry_name: item.geometry_name,
        properties: item.properties,
        geometry: {
          type: item.geometry.type,
          coordinates: [[
                        fixBrokenPolygon.call(this, _.chain(item.geometry.coordinates)
                          .flattenDepth(2)
                          .map(function (coord) {
                            return proj4(projection).inverse(coord)
                          })
                          .value())
                      ]]
          }
        }
      });
    } else {
      transformedFeatures = _.map(geojson.features, function(item) {

        return {
           type: item.type,
           id: item.id,
           geometry_name: item.geometry_name,
           properties: item.properties,
           geometry: {
                     coordinates: proj4(projection).inverse(item.geometry.coordinates),
                     type: item.geometry.type
                     }
          }

      });
    }
    geojson.features = transformedFeatures;

    return geojson;
  }
  function fixBrokenPolygon(arr) {
    var lastIdx = arr.length - 1;

    // hot mess! - but i have to check [lat, lng] are !equal
    if(!((arr[0][0] === arr[lastIdx][0]) && (arr[0][1] === arr[lastIdx][1]))) {
      arr.splice(lastIdx, 1, arr[0]);
    }

    return arr;
  }
