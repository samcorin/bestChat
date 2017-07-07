export const getPos = (acc) => {
  var options = {
    enableHighAccuracy: acc,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    return pos;

  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  // Check if location is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

export const initMap = () => {
  // whrere?
  let center = {lat: 35.7059, lng: 139.6486};
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: center,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false
  });

  var bounds = new window.google.maps.LatLngBounds();
  let markers = [{lat: 35.7080, lng: 139.6486}, {lat: 35.7025, lng: 139.6485}];
  var i, marker;

  for(i = 0; i < markers.length; i++ ) {
    var position = new window.google.maps.LatLng(markers[i].lat, markers[i].lng);
    bounds.extend(position);
    marker = new window.google.maps.Marker({
      position: position,
      map: window.map,
      animation: window.google.maps.Animation.DROP
    })
  };
}
 
