import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';
// Icons
import FaHome from 'react-icons/lib/fa/home';
import FaCalls from 'react-icons/lib/fa/phone';
import FaMapO from 'react-icons/lib/fa/map-o';
import FaUser from 'react-icons/lib/fa/user';
import FaGamepad from 'react-icons/lib/fa/gamepad';

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      slide: '',
      FaHome: null
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
          <NavLink activeStyle={{color: '#2894ff'}} to="/games"><div className="bottomNavButtonItem"><FaGamepad /><p>Games</p></div></NavLink>
        </div>
        <div className="bottomNavButton">
          <NavLink activeStyle={{color: '#2894ff'}} to="/settings"><div className="bottomNavButtonItem"><FaUser /><p>Settings</p></div></NavLink>
        </div>
      </div>
    )
  }
}

export default BottomNav;
