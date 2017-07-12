import {database, conversationsRef} from './../firebase/index';

let coordsListener;
let coordsStore = {};

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

  // getPos();
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


// ================================= coords Listener ==================================
export const getCoords = {
  started: false,
  coordsListener: null,
  coordsStore: {},
  currentUser: null,
  roomId: null,
  start: function(roomId, user) {
    var metaRef = conversationsRef.child(`${roomId}`);

    // metaRef.child('meta').once('value', snapshot => {
    //   console.log("START CHECK", snapshot.val())
    // })

    //   // check for something here

    //   // set it up
      metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false})
    // })

    // this.getPos();
    // if (navigator.geolocation) {
    //   console.log("HELLO. Getting position. Wait a moment...")
    //   navigator.geolocation.getCurrentPosition((pos) => {
    //     console.log("HURRAY, ", user)
    //     metaRef.set(pos.coords);
    //   }, error);
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }

  },
  listen: function(roomId, user, redirect) {
    var metaRef = conversationsRef.child(`${roomId}/meta`);
    // Set username
    if(this.currentUser === null) {
      this.currentUser = user;
    }

    if(this.roomId === null) {
      this.roomId = roomId;
    }

    // What am i listening for? changes to meta. new coords, new ppl, etc..

    metaRef.on('value', snapshot => {
      let obj = snapshot.val();
      console.log("NEW VALUE: ", obj)

        if (navigator.geolocation) {
          console.log("Getting your position. Wait a moment...")
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log("Your coords: ", this.currentUser, pos.coords)
            let coords = {};
            coords['accuracy'] = pos.coords.accuracy;
            coords['latitude'] = pos.coords.latitude;
            coords['longitude'] = pos.coords.longitude;

            // metaRef.child(`${this.currentUser}/coords`).set(pos.coords);
            metaRef.once('value', snapshot => {
              console.log("META VAL: ", snapshot.val())
              metaRef.child(this.currentUser).set(coords)
            })
          }, error);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }

    })

      // const metaRef = conversationsRef.child(this.roomId + '/meta/coords');
      // if meta exists last data, prev session?

      // Someting changed, need to find out what?
      // works here
      // database.child('conversations/' + roomId + '/meta').set({initiator: user, time: Date.now(), redirect: true})


      // ================================================================
      // I'm not the initiator, so I do this
      // if(obj !== null && obj.initiator !== user && !obj[user]) {
      //   console.log("INVITATION")
      //   // this.getPos();
      // if (navigator.geolocation) {
      //   console.log("navigator.geolocation OK")
      //   console.log("Getting position. Wait a moment...")
      //   navigator.geolocation.getCurrentPosition((pos) => {
      //     console.log("Your coords: ", pos.coords)
      //     // let coords = {};
      //     // coords[this.currentUser] = pos.coords;
      //     // metaRef.child(this.currentUser).set(pos.coords);
      //     // updateValues(coords)
      //   }, error);
      // } else {
      //   console.log("Geolocation is not supported by this browser.");
      // }

      // }

      // All set, redirect to Miit page
      // if(obj && obj.redirect) {
      //   // show back button to conversation
      //   window.showMapBack = true;
      //   console.log("Time to bounce") // for all
      //   redirect();
      // }





      // getGeoLoc : function (id) {

      //         var self = this;

      //         navigator.geolocation.getCurrentPosition(function(position) {

      //             var myVar1, myVar2, myVar3; // Define has many variables as you want here

      //             // From here you can pass the position, as well as any other arguments
      //             // you might need.
      //             self.foundLoc(position, self, myVar1, myVar2, myVar3)

      //         }, this.noloc, { timeout : 3});
      //     },

      //     foundLoc : function(position, self, myVar1, myVar2, myVar3) {},
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(this.myCoords, error);
        // } else {
        //   console.log("Geolocation is not supported by this browser.");
        // }



        // if (window.confirm('If you click "ok" you would be redirected')) {
        //  // redirect();
        //  // database.child('conversations/' + roomId + '/meta').update({redirect: true})
        // };

        // if current user coords don't exist, add them
        // if(Object.keys(obj).indexOf(user) === -1) {
        //   console.log("You don't exist yet, ", user)
        //   let myCoords = {};

          // do_a( function(){
            // do_b();
            // database.child('conversations/' + roomId + '/meta').update(myCoords)
          // });

          // myCoords[user] = coords
        // }

        // switch it in there

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
  getPos: function() {
    // IS THE PROBLEM THAT IM GETTING STUCK IN A FEEDBAK LOOP? if this changes, then it sets off another change, and this again.
    var self = this;
    const currentUser = this.currentUser;
    const roomId = this.roomId;


    var updateValues = function(pos) {
      console.log("POSITION OK: ", pos)

      database.child('conversations/' + roomId + '/meta/coords/' + currentUser).set(pos).then(() => {
        console.log("OK! all went well. ")
      }).catch((err) => {
        console.log("There was an error updating the DB. ", err)
      });
      // database.child('conversations/' + roomId + '/meta').set({initiator: user, time: Date.now(), redirect: false, ready: false})

    }

    if (navigator.geolocation) {
      console.log("navigator.geolocation OK")
      console.log("Getting position. Wait a moment...")
      navigator.geolocation.getCurrentPosition((pos) => {

        let coords = {};
        coords[currentUser] = pos.coords;

        updateValues(pos.coords)
      }, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }
}

export const updateCoords = (coords) => {
  let obj = {};
  console.log("SOMETHING CHANGED: ", coords)
  // database.child('conversations/' + roomId + '/coords').updatet(obj);
}
