// WHEN YOU ADD PPL TO GROUP, GRAB THEIR COORDS, ADD THEM TO GROUP USERS COORDS STATE, STORE

import React, { Component } from 'react';
import BottomNav from './../BottomNav';
// import Map from './Map';
import MiitNavBar from './MiitNavBar';
import './Miit.css';
import './../App.css';

var bgImg = {
  backgroundImage: `url(${require('../../utils/img/miit_alley_bg.jpg')})`,
  backgroundRepeat: 'none',
  height: '400px',
  width: '300px'
};

class Miit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      showMap: false
    }
  }

  // componentDidMount() {
  functionA() {
    console.log('Geolocation: ', !!window.google)
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(success, error, options)
    // } else {
    //     console.log("Geolocation is not supported by this browser.");
    // }

    // var bounds = new window.google.maps.LatLngBounds();
    var koenji = {lat: 35.7059, lng: 139.6486};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: koenji,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false
    });

    // Grab groups coords
    // p1
    // p2 ...
    var markers = [
      ['London Eye, London', 51.503454,-0.119562],
      ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

    // enableHighAccuracy: true,
    var options = {
      timeout: 5000,
      maximumAge: 0,
      mapTypeId: 'roadmap'
    };


    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>London Eye</h3>' +
        '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Palace of Westminster</h3>' +
        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
        '</div>']
    ];

    var infoWindow = new window.google.maps.InfoWindow(), marker, i;

    for( i = 0; i < markers.length; i++ ) {
      var position = new window.google.maps.LatLng(markers[i][1], markers[i][2]);
      // bounds.extend(position);
      marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: markers[i][0],
          animation: window.google.maps.Animation.DROP
      });
          // icon: require('../../utils/map-marker-icon-1.png'),

      // Allow each marker to have an info window
      window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
              infoWindow.setContent(infoWindowContent[i][0]);
              infoWindow.open(map, marker);
          }
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      // map.fitBounds(bounds);
    }

    var boundsListener = window.google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        window.google.maps.event.removeListener(boundsListener);
    });

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
  }

  render() {
    if(this.state.showMap) {
      return (
        <div id="MiitWrapper">
            <MiitNavBar />
            <div id="mapWrapper">
              <div id="map"></div>
            </div>
          <BottomNav />
        </div>
      );
    } else {
      return (
        <div id="MiitWrapper">
          <MiitNavBar />
          <div className="waiting">
            Coming soon...
          </div>
          <BottomNav />
        </div>
      )
    }
  }
}
          // <div style={bgImg}></div>
          // <img className="bgImg" src={require('../../utils/img/miit_alley_bg.jpg')} />

export default Miit;





// ============ CENTER =================


// var bound = new google.maps.LatLngBounds();

// for (i = 0; i < locations.length; i++) {
//   bound.extend( new google.maps.LatLng(locations[i][2], locations[i][3]) );

//   // OTHER CODE
// }

// console.log( bound.getCenter() );
