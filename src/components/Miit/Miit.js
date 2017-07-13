// WHEN YOU ADD PPL TO GROUP, GRAB THEIR COORDS, ADD THEM TO GROUP USERS COORDS STATE, STORE

import React, { Component } from 'react';
import {connect} from 'react-redux'
import BottomNav from './../BottomNav';
import {database} from './../../firebase/index';
import './Miit.css';
import './../App.css';
// import Map from './Map';
import {getScript, initMap, getPos, getPosition, miit, setMarker} from './../../utils/mapFunctions';

class Miit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        latitude: null,
        longitude: null
      },
      markers: [],
      loading: false
    }
    // this.setCoords = this.setCoords.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    // this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
    // this.autoCenter = this.autoCenter.bind(this);
    // this.getDirections = this.getDirections.bind(this);
    // this.convertCoords = this.convertCoords.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  // handle center changd
  // map.panTo(latLng);

  // autoCenter(coords, time) {
  //   window.map.addListener('center_changed', () => {
  //     // 3 seconds after the center of the map has changed
  //     var center = new window.google.maps.LatLng(this.state.markers[0].position.lat(), this.state.markers[0].position.lng());
  //     window.setTimeout(() => {
  //       window.map.setCenter()
  //     }, time * 1000);
  //   })
  // }

  watchPosition() {
    return navigator.geolocation.watchPosition((position) => {
      console.log("Your current position: ", position.coords.latitude, position.coords.longitude);
      // update your marker position.
      this.state.markers.map((marker, i) => {
        if(marker.id === this.props.currentUser) {
          console.log("Your new location: ")

          var latlng = new window.google.maps.LatLng(this.state.markers[i].position.lat(), this.state.markers[i].position.lng());
          this.state.markers[i].setPosition(latlng);
        }
      })
    });
  }

  // convertCoords() {
  //   return new Promise((resolve, reject) => {
  //     var resultArr = [];
  //     for(var i = 0; i < this.state.markers.length; i++) {
  //       var location = new window.google.maps.LatLng(this.state.markers[i].position.lat(), this.state.markers[i].position.lng());
  //       window.geocoder.geocode({'latLng': location}, (results, status) => {
  //         if(status === window.google.maps.GeocoderStatus.OK) {
  //           resultArr.push(results[0].formatted_address)
  //         } else {
  //           reject("LOCATION 1 NONO");
  //         }
  //       })
  //     }
  //     resolve(resultArr)
  //   })
  // }


  // travelMode: google.maps.TravelMode[selectedMode]


  // getDirections(origin, destination) {
  //   // console.log("THEN: ", coords)
  //   window.directionsService.route({
  //     origin: origin,
  //     destination: destination,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       window.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  // calculateAndDisplayRoute() {

  //   window.geocoder = new window.google.maps.Geocoder();

  //   this.convertCoords().then((coords) => {
  //     console.log("CCOOODS: ", coords)
  //     this.getDirections(coords)
  //   }).catch((error) => {
  //     console.log("OH OH< :", error)
  //   })

    // Departure
    // var location1 = new window.google.maps.LatLng(this.state.markers[0].position.lat(), this.state.markers[0].position.lng());
    // window.geocoder.geocode({'latLng': location1}, (results, status) => {
    //   if(status === window.google.maps.GeocoderStatus.OK) {
    //     origin = results[0].formatted_address;
    //   } else {
    //     console.log("LOCATION 1 fucked up")
    //   }
    // })

    // Destination
    // var location2 = new window.google.maps.LatLng(this.state.markers[1].position.lat(), this.state.markers[1].position.lng());
    // window.geocoder.geocode({'latLng': location2}, (results, status) => {
    //   if(status === window.google.maps.GeocoderStatus.OK) {
    //     destination = results[0].formatted_address;
    //   } else {
    //     console.log("LOCATION 2 fucked up")
    //   }
    // })
  // }

    // var latlng2 = new window.google.maps.LatLng(this.state.markers[1].position.lat(), this.state.markers[1].position.lng());

    // Do I need to convert these to addresses?
  //   getDirections

  //   window.directionsService.route({
  //     origin: origin,
  //     destination: destination,
  //     travelMode: 'TRANSIT',
  //     transitOptions: {
  //       departureTime: new Date()
  //     }
  //   }, function(response, status) {
  //     if (status === 'OK') {
  //       window.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }


  // Remove marker from array
  deleteMarker(id) {
    //Find and remove the marker from the Array
    for (var i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].id == id) {
        //Remove the marker from Map
        this.state.markers[i].setMap(null);

        //Remove the marker from array.
        this.state.markers.splice(i, 1);
        return;
      }
    }
  };

  // updateMarkers() {
  updateMarker(id, coords) {
    // coords: lat: ..., lng: ...

    for (var i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].id == id) {

        var latlng = new window.google.maps.LatLng(coords.lat, coords.lng);
        this.state.markers[i].setPosition(latlng);
        // update maker on map


        return;
      }
    }
  }


    // Try deleting marker: OK! OK! OK!
    // this.deleteMarker('juku');


    // ============= marker animation ================
    // Update works too!
    // var l = 35.6438;
    // var n = 139.7135;
    // setInterval(() => {
    //   this.updateMarker('juku', {
    //     lat: l += 0.001,
    //     lng: n}
    //   );
    //   var position = new window.google.maps.LatLng(l, n);
    //   window.bounds.extend(position);
    //   window.map.fitBounds(window.bounds);

    // }, 100)

    // Directions:
  //   if(this.state.markers.length == 2) {
  //     this.calculateAndDisplayRoute();
  //   }


  // };

  // ================================================================================================================

  componentDidMount() {
    // Initial map setup
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A", initMap, true);

    if(miit.roomId) {
      database.child('conversations/' + miit.roomId + '/meta').on('value', snapshot => {
        // listen for coords?
        
        const data = snapshot.val();
      
        console.log("LOADING MEET< WAITING FOR COORDS from users.")
        console.log("DB DATA FOR MIIT: ", data)
        // keep listening
        // check if it's old. 
        if(data.time) {
          // ok render the dots
          // render the coords, 
          // export const setMarker = (coords, id) =>{
      
            //       navigator.geolocation.getCurrentPosition((pos) => {
      // const myLatLng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
          
        }

      })
    } else {
      console.log("You're on on own.")
      // do some loading....

      getPosition(this.props.currentUser, null, setMarker)
      // export const setMarker = (coords, 'You') =>{
    }
    // db?
    // database.child('conversations/' + roomId + '/meta').update({redirect: true})
  }
    
    // const pos = getPosition();
    // const promise = new Promise((resolve, reject) => {
    //   console.log(position)
    //   if(position) {
    //     resolve('Success!');
    //   }
    //   else {
    //     reject('Failure!');
    // })

    // promise.then(data => {
    //   console.log('data: ', data)
    // }, (error) => {
    //   console.log("THERE WAS ERROR: ", error)
    // })

    // Get center of map / the middle between markers:
    // window.map.getCenter().lat()
    // window.map.getCenter().lng()
    // focus on this are?

    // Check if location is supported
    // if (navigator.geolocation) {

    //   let options = {
    //     enableHighAccuracy: false,
    //     timeout: 7000,
    //     maximumAge: 0
    //   };

    //   // Keep trying untill success?
    //   navigator.geolocation.getCurrentPosition(this.success, this.error, options);

    //   // Watch user position
    //   this.watchPosition();

    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
  // }

  goBack() {
    window.showMapBack = false;
    window.history.back();
  }

  render() {
    return (
      <div id="MiitWrapper">
        {window.showMapBack && <button onClick={this.goBack} id="mapBackBtn"> {`<`} </button>}
        <div id="map"></div>
        <BottomNav />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Miit);
