import React, {Component} from 'react';
import './Description.css';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    if(this.state.show) {
      return (
        <div className="dText">
          <div>
            <h1>bestChat</h1><p>v0.1</p>
          </div>

          <p><em>What if 'Apps' were URLs?</em></p>

          <h4><em>bestChat is intended for mobile devices.</em></h4>

          <h2>Features</h2>

          <h4>Messaging</h4>
          <p>Real time, WebSocket powered communication.</p>

          <h4>Calls</h4>
          <p>Video and audio chat is moslty available on mobile browsers thanks to the <em>navigator.getUserMedia API</em>. Just waiting for you, iOS 11.</p>

          <h4>Miit</h4>
          <p>Recommends convenient places of interest for you and your friends, </p>

          <h4>Why another *#@?&$ chat app?</h4>

          <p>It's fun to try stuff.</p>

          <ul>
            <li className="why">- bestChat is a Progressive Web App. It works just like a native application.</li>
            <li className="why">- It's <strong>Evergreen</strong>. Self updating. No need to download any updates.</li>
            <li className="why">- No Login. No email. No passwords to remember. Each instance is tied to your device.</li>
          </ul>


          <h4>Release Notes</h4>
          <ul>
            <li><h4>v0.1</h4></li>
            <li>Basic chat works</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dText">
          <div className="dHeader">
            <h1>bestChat</h1><p>v0.1</p>
          </div>
          <p>some text...</p>
        </div>
      );
    }
  }
}

export default Description;
