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
  }

  // setCoords(coords) {
  //   this.setState({
  //     coords: {
  //       latitude: coords.lat,
  //       longitude: coords.lng
  //     }
  //   })
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


    console.log(marker.position)
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
    this.setMarker({
      lat: 35.6938,
      lng: 139.7035
    }, "juku")


    // Try deleting marker: OK! OK! OK!
    // this.deleteMarker('juku');

    // Update works too!
    // var l = 35.6438;
    // setInterval(() => {
    //   this.updateMarker('juku', {
    //     lat: l += 0.02,
    //     lng: 139.7135}
    //   );
    // }, 500)
  };

  // ================================================================================================================

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  componentDidMount() {
    // Initial map setup
    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A", initMap);

    // Check if location is supported
    if (navigator.geolocation) {

      let options = {
        enableHighAccuracy: true,
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
    console.log(this.state)
    if(this.state.showMap) {
      return (
        <div id="MiitWrapper">
          <div id="map"></div>
          <BottomNav />
        </div>
      );
    } else {
      return (
        <div id="MiitWrapper">
          <div className="waiting">
            Coming soon...
          </div>
          <BottomNav />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Miit);


// ============ CENTER =================

// var bound = new google.maps.LatLngBounds();

// for (i = 0; i < locations.length; i++) {
//   bound.extend( new google.maps.LatLng(locations[i][2], locations[i][3]) );

//   // OTHER CODE
// }

// console.log( bound.getCenter() );




// ==============  BOUNDS ===============================

  // functionA() {

    // var bounds = new window.google.maps.LatLngBounds();
    // console.log('Geolocation: ', !!window.google)
    // var koenji = {lat: 35.7059, lng: 139.6486};
    // var map = new window.google.maps.Map(document.getElementById('map'), {
    //   zoom: 16,
    //   center: koenji,
    //   streetViewControl: false,
    //   zoomControl: false,
    //   mapTypeControl: false
    // });

    // Grab groups coords
    // p1
    // p2 ...
    // var markers = [
    //   ['London Eye, London', 51.503454,-0.119562],
    //   ['Palace of Westminster, London', 51.499633,-0.124755]
    // ];

    // enableHighAccuracy: true,
    // var options = {
    //   timeout: 5000,
    //   maximumAge: 0,
    //   mapTypeId: 'roadmap'
    // };


    // var infoWindowContent = [
    //     ['<div class="info_content">' +
    //     '<h3>London Eye</h3>' +
    //     '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
    //     ['<div class="info_content">' +
    //     '<h3>Palace of Westminster</h3>' +
    //     '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
    //     '</div>']
    // ];

    // var infoWindow = new window.google.maps.InfoWindow(), marker, i;

    // for( i = 0; i < markers.length; i++ ) {
    //   var position = new window.google.maps.LatLng(markers[i][1], markers[i][2]);
    //   // bounds.extend(position);
    //   marker = new window.google.maps.Marker({
    //       position: position,
    //       map: map,
    //       title: markers[i][0],
    //       animation: window.google.maps.Animation.DROP
    //   });
    //       // icon: require('../../utils/map-marker-icon-1.png'),

    //   // Allow each marker to have an info window
    //   window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //       return function() {
    //           infoWindow.setContent(infoWindowContent[i][0]);
    //           infoWindow.open(map, marker);
    //       }
    //   })(marker, i));

    //   // Automatically center the map fitting all markers on the screen
    //   // map.fitBounds(bounds);
    // }

    // var boundsListener = window.google.maps.event.addListener((map), 'bounds_changed', function(event) {
    //     this.setZoom(14);
    //     window.google.maps.event.removeListener(boundsListener);
    // });

    // function success(position) {
    //   var pos = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   }
    //   map.setCenter(pos);
    //   var marker = new window.google.maps.Marker({
    //     position: pos,
    //     map: map
    //   });
    // };
    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // };

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(success, error, options)
    // } else {
    //     console.log("Geolocation is not supported by this browser.");
    // }
  // }
