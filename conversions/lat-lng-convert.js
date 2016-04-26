var fs = require('fs');
var proj4 = require('proj4');
var _ = require('lodash');
var helpers = require('./helpers');
var subdivisions = require('./subdiv-chs-raw');
var parkingMeters = require('./parking-meters-raw');
var parks = require('./chs-parks');
// NAD 1983 StatePlane South Carolina FIPS 3900 Feet
// http://epsg.io/102733
proj4.defs("ESRI:102733","+proj=lcc +lat_1=32.5 +lat_2=34.83333333333334 +lat_0=31.83333333333333 +lon_0=-81 +x_0=609600.0000000001 +y_0=0 +datum=NAD83 +units=us-ft +no_defs");

  var convertedSubdivisions = helpers.transformStatePlane(subdivisions, 'ESRI:102733', true);
  var convertedMeters = helpers.transformStatePlane(parkingMeters, 'ESRI:102733', false);
  var convertedParks = helpers.transformStatePlane(parks, 'ESRI:102733', true);

  fs.writeFile('chs-subdivisions.geojson', JSON.stringify(convertedSubdivisions));
  fs.writeFile('chs-parking-meters.geojson', JSON.stringify(convertedMeters));
  fs.writeFile('chs-parks.geojson', JSON.stringify(convertedParks));
