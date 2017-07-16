import {database, usersRef, conversationsRef} from './../firebase/index';
import {addMessageToStore, updateUserTable} from './../actions/index';
import SendMessage from './../components/Home/Modules/SendMessage'

// ==================================================
// Load Google Maps dependency on Miit Component Load
export const getScript = (source, callback) => {

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
        }
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
  
  // 1, you're just looking at meet, "Hey, why don't you invite someone for a drink?"
  
  // 2, you invited someone or you are an invitee, you have coords already and a partner, 
  
  // Try localStorage
  // const myLat = window.localStorage.getItem('myLat') || 35.6895;
  // const myLng = window.localStorage.getItem('myLng') || 139.6917;
  // let center = {lat: myLat, lng: myLng};
  // console.log("YOUR ORIGINAL COORDS: ", myLat, myLng)
  
  // Tokyo
  let center = {lat: 35.6895, lng: 139.6917};
    
  // Show map
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: center,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false
  });

  // Initiate bounds object
  window.bounds = new window.google.maps.LatLngBounds();

  // Used to show directions
  window.directionsService = new window.google.maps.DirectionsService;
  window.directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});


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

  // getPos();
  // if (navigator.geolocation) {
  // let options = {
  //   enableHighAccuracy: false,
  //   timeout: 5000,
  //   maximumAge: 0
  // };

  // Keep trying untill success?
    
    // navigator.geolocation.getCurrentPosition(success, error);

  // Watch user position
  // watchPosition();

  // } else {
  //   console.log("Geolocation is not supported by this browser.");
  // }
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
  // window.map.setCenter(coords);

  // is it necessary to do this? Couldn't I this save to localStorage
  // setMarker(coords)

  // Shinjuku
  // 35.6938° N, 139.7035
  // var num = Math.floor(Math.random() * 10000);

  // var randLng;
  // setMarker({
  //   lat: 35.6662,
  //   lng: 139.7583
  // }, "shim")

  return coords;
}


// =============================================================
// ========================= error ===========================
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

export const NewRoomMessage = (currentUser, room, thatProps) => {
  let message = {
    sender: currentUser,
    text: 'Join me in Miit',
    createdAt: Date.now(),
    type: 'miit'
  }

  const cRef = usersRef.child(currentUser + '/conversations/' + room).push().key;
  message.roomId = cRef;

  // Push message to store
  message.roomName = room;
  thatProps.dispatch(addMessageToStore(message));

  // Update userTable with -> { ID: NAME }
  var userTableObj = {
      id: cRef,
      name: room
  };

  thatProps.dispatch(updateUserTable(userTableObj));

  // Push message to db
  conversationsRef.child(cRef).push(message)

  // Add a reference to this conversation for both users
  usersRef.child(currentUser + '/conversations/' + cRef).set(room);
  usersRef.child(room + '/conversations/' + cRef).set(currentUser);
}


// ====================================================================================
// ======================================= Miit =======================================
// ====================================================================================
export const miit = {
  Map: null,
  bounds: null,
  directionsService: null,
  directionsDisplay: null,
  showMapBack: false,
  started: false,
  coordsListener: null,
  coordsStore: {},
  markers: [],
  currentUser: null,
  roomId: null,
  accepted: false,
  newSession: false,
  redirect: null,
  getScript: function() {
    console.log("MIIT get stcitp", this)
    const that = this;
    
    var newScript = document.getElementById('googleMap');
    if(newScript === null) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A&libraries=places';
      script.id = "googleMap";
      var prior = document.getElementsByTagName('script')[0];
      script.async = 0;
      script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;
          if(!isAbort) {
              that.initMap();
          } else {
            console.log("getScript: Aborted.")
          }
        }
      };
      prior.parentNode.insertBefore(script, prior);
    } else {
      that.initMap();
    }
  },
  initMap: function() {
    // Tokyo
    const center = {lat: 35.6895, lng: 139.6917};
    
    this.Map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 6,
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
    
  },
  start: function(roomId, user, roomName, thatProps, swapped) {
    let metaRef = conversationsRef.child(`${roomId}`);
    
    // Text based on what the initiator chooses, are there options? There might be later.
    const message = {
      sender: user,
      text: 'Join me on Miit.',
      createdAt: Date.now(),
      type: 'miit'
    }
    console.log("START: ", arguments)
    // check if room is new here:
    //   NewRoomMessage(this.props.currentUser, this.props.room, usersRef, conversationsRef, this.props);
    SendMessage(user, message, swapped, roomName, thatProps)

    // Initiate the contract
    metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false, accepted: false});

  },
  listen: function(roomId, user, redirect) {
    // Listening for what?
    // - new coords
    // - 

    let metaRef = conversationsRef.child(`${roomId}/meta`);
    
    // Set username
    if(this.currentUser === null) {
      this.currentUser = user;
    }

    // Set roomId
    if(this.roomId === null) {
      this.roomId = roomId;
    }

    if(this.redirect === null) {
      this.redirect = redirect;
    }

    metaRef.on('value', snapshot => {
      const obj = snapshot.val() || null;
      // wrap this in a timer? 30 seconds?
      const isNew  = (obj && (Date.now() - obj.time) < 30000);
      
      
      // only listen to changes to meta for 30s. why? this only gets us started. 
      // this is so everyone is synced. then Miit.js handles updateing coords
      if(obj && isNew) {
        console.log("... changes to /meta ", obj)
        
        if(obj.started) {
          this.started = true;
        }

        // Finally, if redirect is set up, redirect.
        if(obj.redirect) {
          //   // show back button to conversation
          window.showMapBack = true;
          window.miitSession = true;
          
          redirect();
          
          // Set to false. What if this stops other people from being redirected? or does it happen automatcally?
          metaRef.update({redirect: false})
          // metaRef.update({accepted: false})
        }
      }
    })

  },
  acceptInvite: function(user, roomId) {
    
    const metaRef = conversationsRef.child(`${roomId}/meta`);
    
    console.log("ACCEPTED by: ", user, roomId)
    this.started = true;
    
    // database.child('conversations/' + roomId + '/meta').update({redirect: true})
    metaRef.update({redirect: true})
    
    // person accepts, do stuff. coords etc...
    
    // setTimeout(() => {
    //   if (window.confirm(`${obj.initiator} set up a Miit. Want to join?`)) {
    //     // what if you had a button inside the message?
    //     this.accepted = true;
    //     metaRef.update({accepted: true})
        
    //     setTimeout(() => {
    //       database.child('conversations/' + roomId + '/meta').update({redirect: true})
        
    //       this.getPosition(user, metaRef);
        
    //     }, 1000)

    //   }
    // },1000)

  },
  getMiddle: function(array) {
    console.log("GET MIDDLE:", array)
    let bound = new window.google.maps.LatLngBounds();

    for (let i = 0; i < array.length; i++) {
      bound.extend( new window.google.maps.LatLng(array[i].lat, array[i].lng) );
    }
    //   // OTHER CODE
    console.log("******************* ALL GOOD: ", bound.getCenter(), bound.getCenter().lat())
    // console.log( "WINDOW BOUND: ", window.bound.getCenter() );
    // window.suggestionBounds = new window.google.maps.LatLngBounds(window.bound.getCenter().lat(), window.bound.getCenter().lng());
    // Center point between points
    // window.bound.getCenter().lat()
    // window.bound.getCenter().lng()
    
    
    
    // Middle place
    let center = {}
    center.lat = bound.getCenter().lat();
    center.lng = bound.getCenter().lng()
    // bound.getCenter().lat()
    // {lat: bound.getCenter().lat(), lng: bound.getCenter().lng()}

    // infowindow = new google.maps.InfoWindow();
    // window.PlacesService = new window.google.maps.PlacesService(window.map);
    window.service = new window.google.maps.places.PlacesService(window.map);
    window.service.nearbySearch({
      location: center,
      radius: 100,
      type: ['restaurant']
    }, callback);

    // add filter for only top rated ??
    window.infowindow = new window.google.maps.InfoWindow()
    
    function callback(results, status) {
      console.log("STATUS: ", results, status)
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      let placeLoc = place.geometry.location;
      let marker = new window.google.maps.Marker({
        map: window.map,
        position: place.geometry.location
      });

      window.google.maps.event.addListener(marker, 'click', function() {
        window.infowindow.setContent(place.name);
        window.infowindow.open(window.map, this);
      });
    }

  },
  updateCoords: function(pos, room) {
    // let update = {};
    // // update[this.currentUser] = pos.coords;
    // update[this.currentUser] = "pos.coords";

  },
  getPosition: function(user, ref, callback) {
    
    if (navigator.geolocation) {
      console.log("Getting your position. Wait a moment...")
      navigator.geolocation.getCurrentPosition((pos) => {

        console.log("Your coords: ", user, pos.coords)
        
        let coords = {};
        coords[`/${user}/accuracy`] = pos.coords.accuracy;
        coords[`/${user}/latitude`] = pos.coords.latitude;
        coords[`/${user}/longitude`] = pos.coords.longitude;

        
        // Add to db
        ref.child('coords').update(coords)

        this.coordsStore[user] = {
          accuracy: pos.coords.accuracy,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };

        // Save to localStorage for later reference
        localStorage.setItem('myLat', pos.coords.latitude.toFixed(7));
        localStorage.setItem('myLng', pos.coords.longitude.toFixed(7));
        
      }, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },
  setMarker: function(coords, username, group) {
    const name = username || 'random';
    console.log("SET MARKER COORDS: ", coords)
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
      scale: 14 //pixels
    }

    let marker = new window.google.maps.Marker({
      position: coords,
      map: window.map,
      animation: window.google.maps.Animation.DROP,
      icon: icon,
      id: name,
      title: name
    });
    
    miit.markers.push(marker)


    if(group) {
      // iterate here?
      var position = new window.google.maps.LatLng(coords.lat, coords.lng);
      window.bounds.extend(position);
      window.map.fitBounds(window.bounds);

      // Directions!
      window.directionsDisplay.setMap(window.map);

    } else {
      window.map.setZoom(14);
    }
  }
}

// General purpose locator
export const getPosition = (user, ref, callback) => {
  if (navigator.geolocation) {
    console.log("Getting your position. Wait a moment...")
    navigator.geolocation.getCurrentPosition((pos) => {
      
      const myLatLng = {lat: pos.coords.latitude, lng: pos.coords.longitude};

      localStorage.setItem('myLat', pos.coords.latitude);
      localStorage.setItem('myLng', pos.coords.longitude);
      
      // Single user
      setTimeout(() => {
        miit.Map.setZoom(12);
        callback(myLatLng, user, false);
      }, 200)
      
      // group marker? false
    
    }, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// =============================================================
// ========================= setMarker ===========================
export const setMarker = (coords, username, group) =>{
  const name = username || 'random';
  console.log("SET MARKER COORDS: ", coords)
  miit.Map.setCenter(coords);
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
    scale: 14 //pixels
  }

  const marker = new window.google.maps.Marker({
    position: coords,
    map: window.map,
    animation: window.google.maps.Animation.DROP,
    icon: icon,
    title: name
  });

  // var infowindow = new window.google.maps.InfoWindow({
  //   content: 'Hi'
  // });

  // HOVER?
  // marker.addListener('mouseover', function() {
  //   infowindow.open(marker.get('map'), marker);

  //   marker.addListener('mouseleave', function() {
  //     infowindow.close();
  //   });
  // });


  // this.state.markers.push(marker)

 if(group) {
  var position = new window.google.maps.LatLng(coords.lat, coords.lng);
  window.bounds.extend(position);
  window.map.fitBounds(window.bounds);

  // Directions!
  window.directionsDisplay.setMap(window.map);



 } else {
   miit.Map.setZoom(14);
 }
}


export const updateCoords = (coords) => {
  let obj = {};
  console.log("SOMETHING CHANGED: ", coords)
  // database.child('conversations/' + roomId + '/coords').updatet(obj);
}
