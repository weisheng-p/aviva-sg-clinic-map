jQuery(function($){
  var map;
  var markers = [];
  function initMap(){
    // set up the map
    map = new L.Map('map');
    markers = L.markerClusterGroup({
      chunkedLoading: true
    });

    // create the tile layer with correct attribution
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> | Clinic data from <a href="https://www.aviva.com.sg/pdf/Aviva_MyBenefits_Clinic_Listing.pdf">Aviva Ltd.</a> | Updated 29 May 2016 | <a href="https://github.com/weisheng-p/aviva-sg-clinic-map/blob/master/README.md">about</a>';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});

    // start the map in central singapore
    map.setView(new L.LatLng(1.3561926, 103.8326326),13);
    map.addLayer(osm);
    map.addLayer(markers);
  }
  function plotClinic(clinic){
    var plot = new L.LatLng(clinic.lat, clinic.lng, true);
    var plotmark = new L.Marker(plot);
    plotmark.data = clinic;
    markers.addLayer(plotmark);
    plotmark.bindPopup(
      "<h3>"+clinic.avivaCode + ": " + clinic.name+"</h3>"+
      clinic.address + "<br /> Singapore " + clinic.postalCode);
  }
  $.ajax({
    url : 'clinic.min.json',
    method: 'GET',
    dataType: 'json'
  }).done(function(clinics){
    initMap();
    clinics.forEach(plotClinic);
  });
});
