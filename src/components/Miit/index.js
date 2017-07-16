import {database, usersRef, conversationsRef} from './../../firebase/index';
// import {addMessageToStore, updateUserTable} from './../actions/index';
import SendMessage from './../Home/Modules/SendMessage'

// miit
export const miit = {
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
    SendMessage(user, message, swapped, roomName, usersRef, conversationsRef, thatProps)

    // Initiate the contract
    metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false, accepted: false});

  },
  listen: function(roomId, user, redirect) {
    // Listening for what?
    // - new coords
    // - 

    console.log("Listening... ", this, this.map.a.Map, this.Map)
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

  }
}

export default miit;