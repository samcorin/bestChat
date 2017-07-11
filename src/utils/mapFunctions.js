// ==================================================
// Load Google Maps dependency on Miit Component Load
export const getScript = (source, callback) => {

  // return new Promise((resolve, reject) => {
    // Check to see if google maps dependency already exists. There's got to be a better way.s
    var newScript = document.getElementById('googleMap');
    if(newScript === null) {
      var script = document.createElement('script');
      script.id = "googleMap";
      var prior = document.getElementsByTagName('script')[0];
      script.async = 1;

      script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;

          if(!isAbort && callback) {
            callback();
            // resolve("Script loaded")
          }
        }
      };
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    } else {
      callback();
      // resolve("Script loaded")
    }
  // })
}

// =============================================================
// ========================= initMap ===========================
export const initMap = () => {
  // Just set this for now
  var koenji = {lat: 35.7059, lng: 139.6486};
  // Show map
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: koenji,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false
  });

  // Initiate bounds object
  window.bounds = new window.google.maps.LatLngBounds();

  // Used to show directions
  window.directionsService = new window.google.maps.DirectionsService;
  window.directionsDisplay = new window.google.maps.DirectionsRenderer;


  // Calculate new directions on change, or initial
  // function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  //   directionsService.route({
  //     origin: document.getElementById('start').value,
  //     destination: document.getElementById('end').value,
  //     travelMode: 'DRIVING'
  //   }, function(response, status) {
  //     if (status === 'OK') {
  //       directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  // var onChangeHandler = function() {
  //   window.calculateAndDisplayRoute(window.directionsService, window.directionsDisplay);
  // };

  // should be markers;
  // document.getElementById('start').addEventListener('change', onChangeHandler);
  // document.getElementById('end').addEventListener('change', onChangeHandler);

  if (navigator.geolocation) {
  // let options = {
  //   enableHighAccuracy: false,
  //   timeout: 5000,
  //   maximumAge: 0
  // };

  // Keep trying untill success?
    navigator.geolocation.getCurrentPosition(success, error);

  // Watch user position
  // watchPosition();

  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}


// ==================================================================
// ========================= updateMarker ===========================
export const updateMarker = (id, coords) => {
  for (var i = 0; i < this.state.markers.length; i++) {
    if (this.state.markers[i].id == id) {
      var latlng = new window.google.maps.LatLng(coords.lat, coords.lng);
      this.state.markers[i].setPosition(latlng);
      // return;
    }
  }
}


// =============================================================
// ========================= success ===========================
const success = (position) => {

  // Marker coords
  const coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  // Center map on your position
  window.map.setCenter(coords);

  // is it necessary to do this? Couldn't I this save to localStorage
  setMarker(coords)

  // Shinjuku
  // 35.6938° N, 139.7035
  // var num = Math.floor(Math.random() * 10000);

  // var randLng;
  setMarker({
    lat: 35.6894,
    lng: 139.7003
  }, "juku")

  return position;
}


// =============================================================
// ========================= error ===========================
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


// =============================================================
// ========================= error ===========================
export const setMarker = (coords, id) =>{
  const name = id || 'random';
  window.map.setCenter(coords);
  // var icon = {
  //   url: `https://api.adorable.io/avatars/60/${name}@adorable.io.png`,
  //   scaledSize: new window.google.maps.Size(50, 50),
  //   origin: new window.google.maps.Point(0,0),
  //   anchor: new window.google.maps.Point(0, 0),
  //   shape: {coords:[17,17,18],type:'circle'}
  // };

  var icon = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillOpacity: 0.5,
    fillColor: '#209af7',
    strokeOpacity: 1.0,
    strokeColor: '#fff',
    strokeWeight: 3.0,
    scale: 16 //pixels
  }

  var marker = new window.google.maps.Marker({
    position: coords,
    map: window.map,
    animation: window.google.maps.Animation.DROP,
    icon: icon
  });

  var infowindow = new window.google.maps.InfoWindow({
    content: 'Hi'
  });

  // HOVER?
  // marker.addListener('mouseover', function() {
  //   infowindow.open(marker.get('map'), marker);

  //   marker.addListener('mouseleave', function() {
  //     infowindow.close();
  //   });
  // });


  // this.state.markers.push(marker)


  var position = new window.google.maps.LatLng(coords.lat, coords.lng);
  window.bounds.extend(position);
  window.map.fitBounds(window.bounds);

  // Directions!
  window.directionsDisplay.setMap(window.map);

  // marker.id = id || this.props.currentUser;


  // console.log("MARKER: ", marker)
  // OK
  // this.state.markers.map((m, i) => {
  //   console.log("MAKER ID: ", m.id)
  // })
}
