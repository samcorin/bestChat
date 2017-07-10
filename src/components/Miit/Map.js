import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   markers: [{
    //     position: {
    //       lat: 35.6895,
    //       lng: 139.6917,
    //     },
    //     key: `Tokyo`,
    //     defaultAnimation: 2,
    //   }]
    // }

    this.state = {
      latitude: null,
      longitude: null,
      showMap: true
    }
    this.getScript = this.getScript.bind(this);
    this.initMap = this.initMap.bind(this);
  }

  // handleMapLoad(map) {
  //   this._mapComponent = map;
  //   if (map) {
  //     console.log(map.getZoom());
  //   }
  // }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  // handleMapClick(event) {
  //   const nextMarkers = [
  //     ...this.state.markers,
  //     {
  //       position: event.latLng,
  //       defaultAnimation: 2,
  //       key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
  //     },
  //   ];
  //   this.setState({
  //     markers: nextMarkers,
  //   });
  // }

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     `Right click on the marker to remove it`,
    //     `Also check the code!`
    //   );
    // }

  initMap() {
    // Map should be loaded
    console.log('Geolocation: ', !!window.google)
    var koenji = {lat: 35.7059, lng: 139.6486};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: koenji,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false
    });
  }

  getScript(source, callback) {
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

              if(!isAbort) { if(callback) callback(); }
          }
      };
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    } else {
      // Dependency exists, render map again
      this.initMap();
    }

  }

  componentDidMount() {
    this.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A", this.initMap);
  }

  render() {
    return (
      <div id="mapWrapper">
        <div id="map"></div>
      </div>
    );
  }
}

export default Map;
