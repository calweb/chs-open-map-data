
// proj4.defs("EPSG:32033","+proj=lcc +lat_1=32.33333333333334 +lat_2=33.66666666666666 +lat_0=31.83333333333333 +lon_0=-81 +x_0=609601.2192024384 +y_0=0 +datum=NAD27 +units=us-ft +no_defs");

// gmaps api key: AIzaSyBCAYCXrMRZCXrevgJzhWcLZKYBze2GaBg

var coords;
var map;

(function() {
  window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 32.784893, lng:-79.936352 },
      zoom: 14
    });
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      document.getElementById('legend'));

  }
  document.getElementById('checkNeighborhood').addEventListener('click', function (event) {
    map.data.forEach(function(feat) {
      map.data.remove(feat);
    });
    map.data.addGeoJson(subDivData);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));
    map.setZoom(12);
    map.data.addListener('mouseover', function(event) {
      document.getElementById('info-box').textContent =
       event.feature.getProperty('LABEL');
    });
  }, false);

  document.getElementById('checkMeters').addEventListener('click', function (event) {
    map.data.forEach(function(feat) {
      map.data.remove(feat);
    });
    map.data.addGeoJson(parkingMetersData);
    map.setZoom(16);
    map.setCenter({lat: 32.784893, lng:-79.936352 });
  }, false);

  initMap();
})();
