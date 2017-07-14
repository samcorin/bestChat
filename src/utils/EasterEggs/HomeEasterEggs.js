/* Easter eggs */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const styles = {
  homeButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    position: 'absolute',
    zIndex: '101',
    bottom: '-61px',
    left: '104px',
  },
  offButton: {
    width: '4px',
    height: '45px',
    position: 'absolute',
    zIndex: '101',
    bottom: '349px',
    left: '273px'
  },
  offOverlay: {
    backgroundColor: '#000',
    zIndex: '999',
    width: '100%',
    height: '461px',
    position: 'absolute',
    display:'none'
  }
}

class HomeEasterEggs extends Component {
  componentDidMount() {
    const power = document.getElementById('offButton');
    const overlay = document.getElementById('offOverlay');
    // separate eastereggs file?

    power.addEventListener('click', (e) => {
      console.log("Clicked power button")
        overlay.style.display = 'block';
      // pointer-events: none;
      // power
      setTimeout(() => {
        overlay.style.display = 'none';
      },3000)
      // pointer-events: none; remove
    })
  }

  render() {
    return (
      <div>
        <div id="offButton" style={styles.offButton}></div>
        <div id="offOverlay" style={styles.offOverlay}></div>
        <Link to="/" id="homeButton" style={styles.homeButton}></Link>
      </div>
    )
  }
}

export default HomeEasterEggs;