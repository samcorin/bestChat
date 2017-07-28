import React, { Component } from 'react';
import FaPhone from 'react-icons/lib/fa/phone';
import {AvatarCalling} from './../Home/Modules/Avatars';
import './style.css';

class PreCall extends Component {s
  render() {
    return (
      <div className="preCallWrapper">
        <div className="callerInfo">
          <div className="callerInfo">
            <AvatarCalling />
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
