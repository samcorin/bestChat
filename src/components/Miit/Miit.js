// WHEN YOU ADD PPL TO GROUP, GRAB THEIR COORDS, ADD THEM TO GROUP USERS COORDS STATE, STORE

import React, { Component } from 'react';
import {connect} from 'react-redux'
import BottomNav from './../BottomNav';
import './Miit.css';
import './../App.css';
// import Map from './Map';
import {getScript, initMap, getPos} from './../../utils/mapFunctions';

class Miit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        latitude: null,
        longitude: null
      },
      markers: [],
      showMap: true
    }
    // this.setCoords = this.setCoords.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

  calculateAndDisplayRoute() {

    var latlng1 = new window.google.maps.LatLng(this.state.markers[0].position.lat(), this.state.markers[0].position.lng());
    var latlng2 = new window.google.maps.LatLng(this.state.markers[1].position.lat(), this.state.markers[1].position.lng());

    window.directionsService.route({

      origin: latlng1,
      destination: latlng2,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      if (status === 'OK') {
        window.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

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

  setMarker(coords, id) {

    window.map.setCenter(coords);
    var marker = new window.google.maps.Marker({
      position: coords,
      map: window.map,
      animation: window.google.maps.Animation.DROP
    });

    this.state.markers.push(marker)


    var position = new window.google.maps.LatLng(coords.lat, coords.lng);
    window.bounds.extend(position);
    window.map.fitBounds(window.bounds);

    // Directions!
    window.directionsDisplay.setMap(window.map);

    marker.id = id || this.props.currentUser;


    console.log("MARKER: ", marker)
    // OK
    // this.state.markers.map((m, i) => {
    //   console.log("MAKER ID: ", m.id)
    // })
  }

  // ================================================ SUCCESS ====================================================

  success(position) {

    // Marker coords
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }

    // Center map on your position
    window.map.setCenter(coords);

    // is it necessary to do this? Couldn't I this save to localStorage
    this.setMarker(coords)

    // Shinjuku
    // 35.6938° N, 139.7035
    // var num = Math.floor(Math.random() * 10000);

    var randLng;
    this.setMarker({
      lat: 35.6938,
      lng: 139.7035
    }, "juku")


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
    if(this.state.markers.length == 2) {
      this.calculateAndDisplayRoute();
    }


  };

  // ================================================================================================================

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  componentDidMount() {
    // Initial map setup
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A", initMap);

    // Get center of map / the middle between markers:
    // window.map.getCenter().lat()
    // window.map.getCenter().lng()
    // focus on this are?

    // Check if location is supported
    if (navigator.geolocation) {

      let options = {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 0
      };

      // Keep trying untill success?
      navigator.geolocation.getCurrentPosition(this.success, this.error, options);

      // Watch user position
      var watchID = navigator.geolocation.watchPosition((position) => {
        console.log("Your current position: ", position.coords.latitude, position.coords.longitude);
      });

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {
    return (
      <div id="MiitWrapper">
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
