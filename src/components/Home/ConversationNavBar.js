import React from 'react';
import { NavLink } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
// import FaVideoCamera from 'react-icons/lib/fa/video-camera';

// MENU
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ConversationNavBar extends React.Component {
        // <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />
  render() {
    return (
      <MuiThemeProvider>
        <div style={{backgroundColor: '#2196F3'}} id="ConversationNavBar">
          <NavLink id="backButton" className="LinkStyle" to="/"><FaArrowLeft /></NavLink>
          <div id="room">
            <h4 className="roomName">{this.props.room}</h4>
            <p className="roomStatus">is {this.props.online ? 'online' : 'offline'}</p>
          </div>
          <IconMenu
            iconButtonElement={<IconButton disableTouchRipple={true}><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem disableTouchRipple={true} primaryText="Video Call" />
            <MenuItem disableTouchRipple={true} primaryText="Play 'Game'" />
          </IconMenu>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ConversationNavBar;
