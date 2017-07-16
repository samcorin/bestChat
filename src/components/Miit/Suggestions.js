import React, { Component } from 'react';
import './Suggestions.css';
import style from './Suggestions';

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.suggestionEngine = this.suggestionEngine.bind(this);
  }

  suggestionEngine() {
    // const center = new google.maps.LatLng(-33.8665433,151.1956316);

  }

//   function initialize() {

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['restaurant']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }


  render() {
    // const list of suggestions, map, render as divs indivualsii
    return (
      <div id="Suggestions">
        <ul>
          <li className="suggestion">1</li>
          <li className="suggestion">2</li>
          <li className="suggestion">3</li>
          <li className="suggestion">4</li>
          <li className="suggestion">5</li>
        </ul>
      </div>
    );
  }
}

export default Suggestions;
