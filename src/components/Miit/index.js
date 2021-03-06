import {database, usersRef, conversationsRef} from './../../firebase/index';
import {objSwap} from './../../utils/objFunctions';
import SendMessage from './../Home/Modules/SendMessage';
import map from './map/index';

// miit
export const miit = {
  currentUser: null,
  start: function(roomId, user, roomName, dispatch) {
    
    // Text based on what the initiator chooses, are there options? There might be later.
    let message = {
      sender: user,
      text: 'Join me on Miit.',
      createdAt: Date.now(),
      type: 'miit',
      roomId: roomId,
      roomName: roomName
    };
    
    if(roomId) {
      console.log("Miit started by " + user + " in " + roomId)
      // send Invite
      SendMessage(user, message, dispatch);
      
      // update db
      let metaRef = conversationsRef.child(`${roomId}`)      
      metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false, accepted: false});

    } else {
      console.log("Miit started by but needs to set up the user")
      SendMessage(user, message, dispatch, true);
      // let metaRef = conversationsRef.child(`${roomId}`);
      // is it possible to initiate a new thig?
      // const swapped = objSwap(this.props.userTable);
      // return swapped[roomName];
      // metaRef.child('meta').set({initiator: user, time: Date.now(), redirect: false, accepted: false});
    }

  },
  listen: function(roomId, user, redirect) {
    // Listening for what?
    // - new coords
    // - 

    if(roomId) {
      console.log("Listening...", roomId, user)
      let metaRef = conversationsRef.child(`${roomId}/meta`);
      
      // Set username
      if(this.currentUser === null) {
        this.currentUser = user;
      }

      // Set roomId
      if(this.roomId === null) {
        this.roomId = roomId;
      }

      // Necessary?
      if(this.redirect === null) {
        this.redirect = redirect;
      }

      metaRef.on('value', snapshot => {
        const obj = snapshot.val() || null;
        console.log("value: ", obj)
        // wrap this in a timer? 30 seconds?
        const isNew  = (obj && (Date.now() - obj.time) < 30000);
        
        
        // only listen to changes to meta for 30s. why? this only gets us started. 
        // this is so everyone is synced. then Miit.js handles updateing coords
        if(obj && isNew) {
          console.log("... changes to /meta ", obj);
          
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
            metaRef.update({redirect: true})
            // metaRef.update({accepted: false})
          }
        }
      })
    }

  },
  acceptInvite: function(user, roomId) {
    const metaRef = conversationsRef.child(`${roomId}/meta`);
    
    console.log("ACCEPTED by: ", user, roomId)
    this.started = true;
    
    metaRef.update({redirect: true})
    metaRef.update({accepted: true})
    // database.child('conversations/' + roomId + '/meta').update({accepted: true})
    // database.child('conversations/' + roomId + '/meta').update({redirect: true})
    
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