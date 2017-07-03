import React from 'react';
import { NavLink } from 'react-router-dom'
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import FaVideoCamera from 'react-icons/lib/fa/video-camera';

class ConversationNavBar extends React.Component {
        // <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />
  render() {
    return (
      <div id="ConversationNavBar">
        <NavLink id="backButton" className="LinkStyle" to="/"><FaArrowLeft /></NavLink>
        <p id="room">{this.props.room}</p>
        <FaVideoCamera />
      </div>
    );
  }
}

export default ConversationNavBar;
