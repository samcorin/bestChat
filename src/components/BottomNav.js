import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';
// Icons
import FaHome from 'react-icons/lib/fa/home';
import FaCalls from 'react-icons/lib/fa/phone';
import FaMapO from 'react-icons/lib/fa/map-o';
import FaUser from 'react-icons/lib/fa/user';

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      slide: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slide: value
    })
  };

  render() {
    return (
      <div className="bottomNav">
        <div className="bottomNavButton">
          <NavLink exact activeStyle={{color: '#2894ff'}} to="/"><div className="bottomNavButtonItem"><FaHome /><p>Home</p></div></NavLink>
        </div>
        <div className="bottomNavButton">
          <NavLink activeStyle={{color: '#2894ff'}} to="/calls"><div className="bottomNavButtonItem"><FaCalls /><p>Calls</p></div></NavLink>
        </div>
        <div className="bottomNavButton">
          <NavLink activeStyle={{color: '#2894ff'}} to="/Miit"><div className="bottomNavButtonItem"><FaMapO /><p>Miit</p></div></NavLink>
        </div>
        <div className="bottomNavButton">
          <NavLink activeStyle={{color: '#2894ff'}} to="/settings"><div className="bottomNavButtonItem"><FaUser /><p>Settings</p></div></NavLink>
        </div>
      </div>
    )
  }
}
          // <div className="bottomNavButton">
          //   <NavLink activeStyle={{color: '#2894ff'}} to="/settings"><div className="bottomNavButtonItem">
          //   <img className="linkIcon" height="22" width="24" src={require('../utils/icons/home.svg')} /><p>Settings</p></div></NavLink>
          // </div>
            // <img height="22" width="24" src={require('../utils/icons/homeIcon.png')} /><p>Settings</p></div></NavLink>

export default BottomNav;
