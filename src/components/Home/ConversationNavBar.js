import React, {Component} from 'react';
import { NavLink, Link, Redirect} from 'react-router-dom'
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import dropdown from './../../utils/dropdown';

class ConversationNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  // <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />

  componentDidMount() {
    dropdown.init();
    const call = document.getElementById('initCall');
    const miit = document.getElementById('initMiit');

    const startCall = () => {
      console.log("start call to: ", this.props.room)
      // <NavLink className="LinkStyle" to="/Miit"><FaArrowLeft /></NavLink>
      // webrtc stuff.

    }

    const startMiit = () => {
      console.log("start MIIT to: ", this.props.room)
      // do something about dropdown?
      this.setState({
        redirect: true
      })
      // <NavLink className="LinkStyle" to="/Miit"><FaArrowLeft /></NavLink>

      // show a new screen? or go straight to miit?
      // 1. get currentUser coords?
      // 2. get other users coords?
      // browserHistory.push('/Miit')
    }


    // Event listeners for Calls
    call.addEventListener('touchstart', startCall, false);
    call.addEventListener('click', startCall, false);

    // Event listeners for Miit
    miit.addEventListener('touchstart', startMiit, false);
    miit.addEventListener('click', startMiit, false);

  }



  render() {
    if (this.state.redirect) {
      return <Redirect push to='/Miit' />;
    }
    return (
      <div style={{backgroundColor: '#2196F3'}} id="ConversationNavBar">
        <NavLink id="backButton" className="LinkStyle" to="/"><FaArrowLeft /></NavLink>
        <div id="room">
          <h4 className="roomName">{this.props.room}</h4>
          <p className="roomStatus">is {this.props.online ? 'online' : 'offline'}</p>
        </div>

        <div className="dropdown">
          <p>menu</p>
          <div className="dropdownMenu">
            <ul>
              <li id="initCall">Call {this.props.room}</li>
              <li id="initMiit">Miit {this.props.room}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationNavBar;
