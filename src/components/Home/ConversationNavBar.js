import React, {Component} from 'react';
import {connect} from 'react-redux'
import { NavLink, Link, Redirect} from 'react-router-dom'
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import dropdown from './../../utils/dropdown';
import {objSwap} from './../../utils/objFunctions';
import {getCoords} from './../../utils/mapFunctions.js';

class ConversationNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      roomId: ''
    }
    this.setRedirect = this.setRedirect.bind(this);
    this.startMiit = this.startMiit.bind(this);
  }

  // <img src={`https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`} className="previewPhoto" />

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

// This user isthe initiator, that means that you need to push your coords to the db
  startMiit() {
    // roomId messes up sometimes?
    console.log("Miit started by " + this.props.currentUser + " in " + this.state.roomId)
    // const pos = getPos();
    getCoords.start(this.state.roomId, this.props.currentUser);
    // if other person accepts, ok
    // Chain
    // .on('child_added', function(obj) {
      // do stuff...
    // }).off();

    // Detach listener
    // coordsListener.off();
  }

  componentDidMount() {
    dropdown.init();
    
    const call = document.getElementById('initCall');
    const miit = document.getElementById('initMiit');

    const startCall = () => {
      console.log("start call to: ", this.props.room)
      // <NavLink className="LinkStyle" to="/Miit"><FaArrowLeft /></NavLink>
      // webrtc stuff.

    }

    // componentWillUnmount() {
    //   coordsListener.off();
    // }


    // Listen for events
    // ===================== PROBLEM ======================
    // this stuff isnt loaded if you start at the screen, 
    const swapped = objSwap(this.props.userTable);
    // what if it's null?
    // It's a problem when users start in the conversatoin. no time to load? need to dissalow urls other than root
    const roomId = swapped[this.props.room];
    console.log("SWAPPED ID ETC>>> ", swapped, roomId)
    this.setState({
      roomId: roomId
    })
    getCoords.listen(roomId, this.props.currentUser, this.setRedirect);


    // Event listeners for Calls
    // call.addEventListener('touchstart', startCall, false);
    call.addEventListener('click', startCall);

    // Event listeners for Miit
    // miit.addEventListener('touchstart', this.startMiit, false);
    miit.addEventListener('click', this.startMiit);

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
          <p className="roomStatus">is {(this.props.online || this.props.room === 'admin-bot') ? 'online' : 'offline'}</p>
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

// export default ConversationNavBar;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  userTable: state.userTable
});

export default connect(mapStateToProps)(ConversationNavBar);
