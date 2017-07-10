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

// =============================================================
// ========================= initMap ===========================
export const initMap = () => {
  // Just set this for now
  var koenji = {lat: 35.7059, lng: 139.6486};
  // Show map
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 12,
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

  var onChangeHandler = function() {
    window.calculateAndDisplayRoute(window.directionsService, window.directionsDisplay);
  };

  // should be markers;
  // document.getElementById('start').addEventListener('change', onChangeHandler);
  // document.getElementById('end').addEventListener('change', onChangeHandler);
}
