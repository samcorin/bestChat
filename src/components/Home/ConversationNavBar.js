import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import dropdown from './../../utils/dropdown';
import {objSwap} from './../../utils/objFunctions';
import './ConversationNavBar.css'

// Show users image:
// <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />

class ConversationNavBar extends Component {
  componentDidMount() {
    dropdown.init();

    // const call = document.getElementById('initCall');
    const miitDiv = document.getElementById('startMiit');

    // Event listeners for Calls
    // call.addEventListener('touchstart', startCall);
    // call.addEventListener('click', startCall);

    // Event listeners for Miit
    // - tried doing onMouseDown on the list element, didn't work
    miitDiv.addEventListener('click', this.props.startMiit);
    miitDiv.addEventListener('touchstart', this.props.startMiit);
  }

  render() {
    return (
      <div style={{backgroundColor: '#2196F3'}} id="ConversationNavBar">
        <NavLink id="backButton" className="LinkStyle" to="/"><FaArrowLeft /></NavLink>
        <div id="room">
          <h4 className="roomName">{this.props.room}</h4>
          <p className="roomStatus">is {(this.props.online || this.props.room === 'admin-bot') ? 'online' : 'offline'}</p>
        </div>

        <div className="dropdown">
          <p>menu</p>
          <div className="dropdownMenu">
            <ul>
              <li id="initCall">Call {this.props.room}</li>
              <li id="startMiit">Miit {this.props.room}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationNavBar;