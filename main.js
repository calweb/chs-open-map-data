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
    loadNewFeatureLayer(map, 12, '/chs-subdivisions.geojson');
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));
    map.data.addListener('mouseover', function(event) {
      document.getElementById('info-box').textContent =
       event.feature.getProperty('LABEL');
    });
  }, false);

  document.getElementById('checkMeters').addEventListener('click', function (event) {
    loadNewFeatureLayer(map, 16, '/chs-parking-meters.geojson');

  }, false);

  document.getElementById('checkParks').addEventListener('click', function (event) {
    loadNewFeatureLayer(map, 12, '/chs-parks.geojson');

    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));
    map.data.addListener('mouseover', function(event) {
      document.getElementById('info-box').textContent =
       event.feature.getProperty('NAME');
    });
  }, false);

  document.getElementById('beachAccess').addEventListener('click', function (event) {
    loadNewFeatureLayer(map, 12, '/BEACH_ACCESS.geojson');

    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));
    map.data.addListener('mouseover', function(event) {
      document.getElementById('info-box').textContent =
       event.feature.getProperty('Pathway');
    });
  }, false);

  document.getElementById('checkSheds').addEventListener('click', function (event) {
    loadNewFeatureLayer(map, 10, '/TMDL_Sheds.geojson');

    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));

    map.data.addListener('mouseover', function(event) {

      var linkDoc = '<a href="' + event.feature.getProperty('Document') + '">' + event.feature.getProperty('Waterbody') +'</a>';

      document.getElementById('info-box').innerHTML = linkDoc;
    });
  }, false);

  initMap();
})();

function removeFeatures(mapInstance) {
  mapInstance.data.forEach(function(feat) {
    mapInstance.data.remove(feat);
  });
}

function loadNewFeatureLayer(mapInstance, zoom, geojson) {
  removeFeatures(mapInstance);
  mapInstance.data.loadGeoJson(geojson);
  mapInstance.setZoom(zoom)
}
