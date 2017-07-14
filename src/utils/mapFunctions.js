import {database, usersRef, conversationsRef} from './../firebase/index';
import SendMessage from './../components/Home/Modules/SendMessage'

let coordsListener;
let coordsStore = {};

// ==================================================
// Load Google Maps dependency on Miit Component Load
export const getScript = (source, callback, isMiit) => {

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
            // if(isMiit) {
            //   // getPosition()
            // }
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
  
  // 1, you're just looking at meet, "Hey, why don't you invite someone for a drink?"
  
  // 2, you invited someone or you are an invitee, you have coords already and a partner, 
  
  // Try localStorage
  // const myLat = window.localStorage.getItem('myLat') || 35.6895;
  // const myLng = window.localStorage.getItem('myLng') || 139.6917;
  // let center = {lat: myLat, lng: myLng};
  // console.log("YOUR ORIGINAL COORDS: ", myLat, myLng)
  
  let center = {lat: 35.6895, lng: 139.6917};
    
  // Show map
  window.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center,
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


// =============================================================
// ========================= setMarker ===========================
export const setMarker = (coords, id, group) =>{
  const name = id || 'random';
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

 if(group) {
  var position = new window.google.maps.LatLng(coords.lat, coords.lng);
  window.bounds.extend(position);
  window.map.fitBounds(window.bounds);

  // Directions!
  window.directionsDisplay.setMap(window.map);

 } else {
   window.map.setZoom(14);
 }

  // marker.id = id || this.props.currentUser;


  // console.log("MARKER: ", marker)
  // OK
  // this.state.markers.map((m, i) => {
  //   console.log("MAKER ID: ", m.id)
  // })
}


// ================================= coords Listener ==================================
export const miit = {
  started: false,
  coordsListener: null,
  coordsStore: {},
  currentUser: null,
  roomId: null,
  accepted: false,
  newSession: false,
  start: function(roomId, user, roomName, thatProps, swapped) {
    // Might move vars in here...
    // started: false,
    // coordsListener: null,
    // coordsStore: {},
    // currentUser: null,
    // roomId: null,
    // accepted: false,
    // newSession: false,
    var metaRef = conversationsRef.child(`${roomId}`);

    // Text based on what the initiator chooses, are there options? There might be later.
    const message = {
      sender: user,
      text: 'Wanna grab a drink? 🍻',
      createdAt: Date.now(),
      type: 'miit'
    }

    SendMessage(user, message, swapped, roomName, usersRef, conversationsRef, thatProps)

    // make sure roomId and user are not undefined, or why are they?
    setTimeout(() => {
      metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false, accepted: false});
    }, 700);

  },
  listen: function(roomId, user, redirect) {
    // started: false,
    // coordsListener: null,
    // coordsStore: {},
    // currentUser: null,
    // roomId: null,
    // accepted: false,
    // newSession: false,
    // redirect in the db acts as a global var. it should set the redirect for everyone.


    // What do I want to happen here? What is this listening for?
    console.log("Listening...")
    var metaRef = conversationsRef.child(`${roomId}/meta`);
    // Set username
    if(this.currentUser === null) {
      this.currentUser = user;
    }

    if(this.roomId === null) {
      this.roomId = roomId;
    }

    // check here if session is old?
    // metaRef.once('value', snapshot => {
    //   let obj = snapshot.val();
    //   console.log("TIME: ", obj)
      // console.log('obj: ', (Date.now() - obj.time) > 10 * 1000)
      
      // // first person to join room checks if the last request is old. 1 minutes?
      // if (!!obj && (Date.now() - obj.time) > 10 * 1000) {
      //   console.log("Clearing session.")
      //   // or delete it
      //   // metaRef.update({redirect: false})
      //   metaRef.set(null)
      // }
    // })

    metaRef.on('value', snapshot => {
      let obj = snapshot.val() || null;
      console.log("... changes to /meta ", obj)


      // console.log('obj: ', (Date.now() - obj.time) > 10 * 1000)
      
      // first person to join room checks if the last request is old. 30s?
      // if (!!obj && ((Date.now() - obj.time) > 30000)) {
      //   this.newSession = true;
      //   console.log("Clearing session.")
      //   metaRef.remove();
      //   // or delete it
      //   metaRef.update({time: Date.now()})
      //   let hello = {};
      //   hello[user] = "HELLO"
      //   let t = {};
      //   t['/newref/hello//test'] = "HELLO"

      //   metaRef.set({accepted: false})
      //   console.log("accepted...")
      //   metaRef.update({another: true})
      //   console.log("anotehr...")
      //   metaRef.update(hello)
      //   metaRef.update(t)

      // }

      // #1
      // also check that the invitation is less than 15 seconds old
      const fresh = (obj && ((Date.now()) - obj.time) < 15000);
      // Accepted: only done once, this starts the coords process, etc..
      if(!!obj && obj.initiator !== user && fresh && obj.redirect === false && !this.accepted) {
        console.log(' *** Invite *** from: ', obj.initiator)
        
        // Once you get the invite you need to do something about the init thing
        setTimeout(() => {
          if (window.confirm(`${obj.initiator} set up a Miit. Want to join?`)) {
            // what if you had a button inside the message?
            this.accepted = true;
            metaRef.update({accepted: true})
            
            setTimeout(() => {
              database.child('conversations/' + roomId + '/meta').update({redirect: true})
            
              this.getPosition(user, metaRef);
            
            }, 1000)

          }
        },1000)
      } 
      
      // Initiator checks coords
      const newSession = (obj && (Date.now() - obj.time) < 30 * 1000);
      if(obj && obj.accepted && obj.initiator === user && newSession) {
        console.log("It's your turn")
        this.getPosition(user, metaRef);
        this.accepted = true;
      }
      
      if(obj && !!obj.coords && newSession) {
        console.log("You're good to go.")
        // redirect();
      }
      // #2
      // session is < 30s
      // if(this.accepted && newSession && !obj.redirect) {
        // then get coords for everyone, then set redirect
        
        // this.getPosition(user, metaRef);
        // if (navigator.geolocation) {
          
        //   console.log("Getting your position. Wait a moment...")
        //   navigator.geolocation.getCurrentPosition((pos) => {
            
        //     console.log("Your coords: ", user, pos.coords)
            
        //     let coords = {};
        //     coords[`/${user}/accuracy`] = pos.coords.accuracy;
        //     coords[`/${user}/latitude`] = pos.coords.latitude;
        //     coords[`/${user}/longitude`] = pos.coords.longitude;

        //     metaRef.child('coords').update(coords)
            
        //   }, error);
        // } else {
        //   console.log("Geolocation is not supported by this browser.");
        // }
      
    // }

      // #3
      // Finally, if redirect is set up, redirect.
      if(obj && obj.redirect) {
        // show back button to conversation
        window.showMapBack = true;
        console.log("Time to bounce") // for all
        redirect();
        metaRef.update({redirect: false})
      }
    })

  },
  updateCoords: function(pos, room) {
    let update = {};
    // update[this.currentUser] = pos.coords;
    update[this.currentUser] = "pos.coords";

    // database.child('conversations/' + room + '/meta').set({time: "test"})
    // var updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    // database.update(update);
  },
  getPosition: function(user, ref) {
    if (navigator.geolocation) {
      console.log("Getting your position. Wait a moment...")
      navigator.geolocation.getCurrentPosition((pos) => {

        console.log("Your coords: ", user, pos.coords)
        
        let coords = {};
        coords[`/${user}/accuracy`] = pos.coords.accuracy;
        coords[`/${user}/latitude`] = pos.coords.latitude;
        coords[`/${user}/longitude`] = pos.coords.longitude;

        this.coordsStore[user] = {
          accuracy: pos.coords.accuracy,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        
        localStorage.setItem('myLat', pos.coords.latitude.toFixed(7));
        localStorage.setItem('myLng', pos.coords.longitude.toFixed(7));

        // Add to db
        ref.child('coords').update(coords)
        
      }, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
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
      window.map.setZoom(12);
      // group marker? false
      callback(myLatLng, user, false);

    }, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

export const updateCoords = (coords) => {
  let obj = {};
  console.log("SOMETHING CHANGED: ", coords)
  // database.child('conversations/' + roomId + '/coords').updatet(obj);
}
