// this will replace miit.
// just call it map
export const map = {
  // Initial map setup
  Map: null,
  bounds: null,
  directionsService: null,
  directionsDisplay: null,
  showMapBack: false,
  currentUser: null,

  // etc...
  // started: false,
  // coordsListener: null,
  // coordsStore: {},
  // markers: [],
  // roomId: null,
  // accepted: false,
  // newSession: false,
  // redirect: null,
  getScript: function(user, group) {
    this.currentUser = user;
    const _this = this;
    
    let newScript = document.getElementById('googleMap');
    if(newScript === null) {
      let script = document.createElement('script');
      script.id = "googleMap";
      let prior = document.getElementsByTagName('script')[0];
      script.async = 1;
      script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;
          if(!isAbort) {
            // check if google... ok
            _this.initMap(group);
          } else {
            console.log("getScript: Aborted.")
          }
        }
      };
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A&libraries=places';
      prior.parentNode.insertBefore(script, prior);
    } else {
      // check if google... ok
      _this.initMap(group);
    }
  },
  initMap: function(group) {
    // Tokyo
    const center = {lat: 35.6895, lng: 139.6917};
    console.log("MAP INITIATED")
    this.Map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: center,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false
    });

    // Initiate bounds object
    this.bounds = new window.google.maps.LatLngBounds();

    // Used to show directions
    this.directionsService = new window.google.maps.DirectionsService;
    this.directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
    
    if(!group) {
      console.log('hey, loading your marker')
      this.showCurrentUser();
    }

  },
  showCurrentUser: function() {
    // Gets user coordinates
    const _this = this;
    console.log("MAPS???< ", this.Map)
    if (navigator.geolocation) {
      console.log("Getting your position. Wait a moment...")
      navigator.geolocation.getCurrentPosition((pos) => {
        const LatLng = {lat: pos.coords.latitude, lng: pos.coords.longitude};        
        console.log("_this: ", _this)
        
        // wait for it to load.
        // let counter = 0;
        // setInterval(() => {
                  
          _this.Map.setZoom(12);
          _this.addMarker(LatLng, _this.currentUser);

        // },20)

        // localStorage.setItem('myLat', pos.coords.latitude);
        // localStorage.setItem('myLng', pos.coords.longitude);
      }, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

  },
  addMarker: function(pos, username) {
    // places maker for a user
    // This has to be dynamic
    // theres a marker array, do I add everything to it?, 
    let marker = new window.google.maps.Marker({
      map: this.Map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      position: pos,
      title: username
    });

    // const infowindow = new window.google.maps.InfoWindow({
    //   content: '<div id="content">YO</div>'
    // });

    // marker.addListener('mouseover', () => {
    //   console.log("mouseover")
    //   infowindow.open(this.Map, this);
    // });

    // marker.addListener('mouseout', function() {
    //     infowindow.close();
    // });
  }
}

export default map;