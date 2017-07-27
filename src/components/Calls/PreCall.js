import React, { Component } from 'react';
// import BottomNav from './../BottomNav';
// import CallsNavBar from './CallsNavBar';
// import { screenTest } from './../../utils/WebRTC/screenTest';
// import { peerConnection } from './../../utils/WebRTC/peerConnection';
import FaPhone from 'react-icons/lib/fa/phone';

import './style.css';

class PreCall extends Component {

  componentDidMount() {
    // screenTest();
    // peerConnection();
  }

  render() {
    return (
      <div className="preCallWrapper">
        <div className="callerInfo">
          <div className="callerInfo">
            <span className="callerName">username</span>
            <span className="isCalling">is calling</span>
          </div>
        </div>
        <div className="callResponseWrapper">
          <div>
            <div className="callDecline responseButton">
              <FaPhone/>
            </div>
            <p className="responseButtonText">Decline</p>
          </div>
          <div>
            <div className="callAccept responseButton">
              <FaPhone/>
            </div>
            <p className="responseButtonText">Accept</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PreCall;
