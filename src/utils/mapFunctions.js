// ==================================================
// Load Google Maps dependency on Miit Component Load
export const getScript = (source, callback) => {
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

            if(!isAbort) { if(callback) callback(); }
        }
    };
    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  } else {
    callback();
  }
}

// ========================= initMap ===========================
// Show map on screen
export const initMap = () => {
  console.log('Geolocation: ', !!window.google)

  // Just set this for now
  var koenji = {lat: 35.7059, lng: 139.6486};
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: koenji,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false
  });

  window.bounds = new window.google.maps.LatLngBounds();

  window.directionsService = new window.google.maps.DirectionsService;
  window.directionsDisplay = new window.google.maps.DirectionsRenderer;

  // Calculate new directions on change, or initial
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var onChangeHandler = function() {
    window.calculateAndDisplayRoute(window.directionsService, window.directionsDisplay);
  };

  // should be markers;
  // document.getElementById('start').addEventListener('change', onChangeHandler);
  // document.getElementById('end').addEventListener('change', onChangeHandler);
}

// Init bounds

// =================================================
// Get User Position, acc: true or false
// export const getPos = (scope, acc) => {
//   var options = {
//     enableHighAccuracy: acc || false,
//     timeout: 5000,
//     maximumAge: 0
//   };

//   const success = (pos) => {

//     // Optional Console views
//     // var crd = pos.coords;
//     // console.log('Your current position is:');
//     // console.log(`Latitude : ${crd.latitude}`);
//     // console.log(`Longitude: ${crd.longitude}`);
//     // console.log(`More or less ${crd.accuracy} meters.`);
//     scope.setState({
//       coords: {
//         latitude: coords.lat,
//         longitude: coords.lng
//       }
//     })

//     // Returns users coords
//     return pos.coords;
//     // callback(pos.coords);
//   };

//   const error = (err) => {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   };

//   // Check if location is supported
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, error, options);
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// }


// OLD - multiple markers + bounds

// export const initMap = () => {

//   var bounds = new window.google.maps.LatLngBounds();
//   let markers = [{lat: 35.7080, lng: 139.6486}, {lat: 35.7025, lng: 139.6485}];
//   var i, marker;

//   for(i = 0; i < markers.length; i++ ) {
//     var position = new window.google.maps.LatLng(markers[i].lat, markers[i].lng);
//     bounds.extend(position);
//     marker = new window.google.maps.Marker({
//       position: position,
//       map: window.map,
//       animation: window.google.maps.Animation.DROP
//     })
//   };
// }
//  
