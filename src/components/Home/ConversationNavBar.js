import React from 'react';
import { NavLink } from 'react-router-dom'
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';

class ConversationNavBar extends React.Component {
  // <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />

  // Replace dropdown menu with plain js
  render() {
    return (
      <div style={{backgroundColor: '#2196F3'}} id="ConversationNavBar">
        <NavLink id="backButton" className="LinkStyle" to="/"><FaArrowLeft /></NavLink>
        <div id="room">
          <h4 className="roomName">{this.props.room}</h4>
          <p className="roomStatus">is {this.props.online ? 'online' : 'offline'}</p>
        </div>
      </div>
    );
  }
}

export default ConversationNavBar;
