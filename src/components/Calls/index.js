import React, { Component } from 'react';
import BottomNav from './../BottomNav';
import CallsNavBar from './CallsNavBar';
import { screenTest } from './../../utils/WebRTC/screenTest';
import { peerConnection } from './../../utils/WebRTC/peerConnection';
import './style.css';

class Calls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    screenTest();
    // peerConnection();
    // peerConnection.listen(roomId);
  }

  setRedirect() {
    console.log("Redirect")
    this.setState({
      redirect: true
    })
  }

  render() {
    return (
      <div className="WebRTCwrapper">
        <CallsNavBar />
        <div className="WebRTC">
          <video id="videoCapture" autoPlay></video>
          <div className="canvasWrapper">
            <div id="canvasOverlay" className="canvasOverlay">take snapshot</div>
            <canvas id="takeSnapshot"></canvas>
          </div>
          
        </div>
         <BottomNav /> 
      </div>
    );
  }
}

export default Calls;
