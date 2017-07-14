import React, {Component} from 'react';
import {connect} from 'react-redux'
import { NavLink, Link, Redirect} from 'react-router-dom'
import './ConversationNavBar.css'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import dropdown from './../../utils/dropdown';
import {objSwap} from './../../utils/objFunctions';
import {miit} from './../../utils/mapFunctions.js';

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
    // Ensure values are defined
    let counter = 0;
    let timer = setInterval(() => {
      const swapped = objSwap(this.props.userTable);
      const roomId = swapped[this.props.room];
      
      let defined = (!!this.props.currentUser && !!roomId && !!swapped);    

      if(defined) {
        clearInterval(timer);
        miit.start(roomId, this.props.currentUser, this.props.room, this.props, swapped);
        console.log("Miit started by " + this.props.currentUser + " in " + roomId)
      }
      
      // Increment counter. Limit to 3s
      counter++;
      if(counter > 30) {
        console.log("Miit timed out.")
        clearInterval(timer);
      }
    },100)
  }

  componentDidMount() {
    dropdown.init();
    
    // const call = document.getElementById('initCall');
    const miitDiv = document.getElementById('initMiit');

    // const startCall = () => {
      // console.log("start call to: ", this.props.room)
      // <NavLink className="LinkStyle" to="/Miit"><FaArrowLeft /></NavLink>
      // webrtc stuff.
    // }
    
    // Setting up main listener, ensure all vars load beforehand
    let counter = 0;
    let timer = setInterval(() => {
      const swapped = objSwap(this.props.userTable);
      const roomId = swapped[this.props.room];
      let defined = (!!swapped && !!roomId && !!this.props.currentUser);   
      
      if(defined) {
        clearInterval(timer);
        defined = false;
        miit.listen(roomId, this.props.currentUser, this.setRedirect);
      }
      
      // Increment counter. Limit to 3s
      counter++;
      if(counter > 30) {
        console.log("Listener timed out.")
        clearInterval(timer);
      }
    },100)


    // Event listeners for Calls
    // call.addEventListener('touchstart', startCall);
    // call.addEventListener('click', startCall);

    // Event listeners for Miit
    miitDiv.addEventListener('click', this.startMiit);
    miitDiv.addEventListener('touchstart', this.startMiit);

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
