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
  document.getElementById('checkParks').addEventListener('click', function (event) {
    map.data.forEach(function(feat) {
      map.data.remove(feat);
    });
    map.data.addGeoJson(chsParks);
    map.setZoom(12);
    map.setCenter({lat: 32.784893, lng:-79.936352 });
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(document.getElementById('info-box'));
    map.data.addListener('mouseover', function(event) {
      document.getElementById('info-box').textContent =
       event.feature.getProperty('NAME');
       console.log(event)
    });
  }, false);

  initMap();
})();
