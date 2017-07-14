import React, { Component } from 'react';
import './Suggestions.css';

class Suggestions extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    // const list of suggestions, map, render as divs indivualsii
    return (
      <div id="Suggestions">
        <div className="suggestion">Option #1</div>
        <div className="suggestion">Option #2</div>
        <div className="suggestion">Option #3</div>
        <div className="suggestion">Option #4</div>
      </div>
    );
  }
}

export default Suggestions;
