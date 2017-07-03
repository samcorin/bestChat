import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
// import _ from 'lodash';
import FaSpinner from 'react-icons/lib/fa/spinner';
import './Map.css';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Loaded using async loader.
 */
const AsyncGettingStartedExampleGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
    options={{ streetViewControl: false, zoomControl: false, mapTypeControl: false }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [{
        position: {
          lat: 35.6895,
          lng: 139.6917,
        },
        key: `Tokyo`,
        defaultAnimation: 2,
      }]
    }

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }

  // static propTypes = {
  //   toast: PropTypes.func.isRequired,
  // };

  // componentDidMount() {

  // }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     `Right click on the marker to remove it`,
    //     `Also check the code!`
    //   );
    // }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
        <AsyncGettingStartedExampleGoogleMap
          googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A&libraries=geometry,drawing,places'}
          loadingElement={
            <div style={{ height: `100%` }}>
              <FaSpinner
                style={{
                  display: `block`,
                  width: `80px`,
                  height: `80px`,
                  margin: `150px auto`,
                  animation: `fa-spin 2s infinite linear`,
                }}
              />
            </div>
          }
          containerElement={
            <div style={{ height: `100%`, width: `100%`  }} />
          }
          mapElement={
            <div style={{ height: `100%`, width: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          // onMapClick={this.handleMapClick}
        />
    );
  }
}

export default Map;
