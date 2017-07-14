import React, { Component } from 'react';
import {connect} from 'react-redux'
import Home from './Home/Home';
import Conversation from './Home/Conversation';
import Calls from './Calls/Calls';
import Miit from './Miit/Miit';
import Settings from './Settings';
import Description from './Description';
import Games from './Games/Games';
import UsernameEditor from './../utils/UsernameEditor';
import './App.css';
import HomeEasterEggs from './../utils/EasterEggs/HomeEasterEggs';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// const Conversation = () => import('./Home/Conversation');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      currentUser: ''
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({
      width: window.innerWidth
    });
  };

  render() {
    const isMobile = window.innerWidth <= 600;

    return (
      <div className="wrapper">
        <div className={isMobile ? '' : 'demo'}>
          <Router>
            <div className={isMobile ? 'chatScreenMob' : 'chatScreen'} id="chatScreen">
              {this.props.currentUser === 'ok' && <UsernameEditor />}
              {!isMobile &&
                <img src={require("../utils/img/ios_template_min_3.png")}
                     alt="iPhone6s"
                     className="iphoneImg" />}
              {!isMobile && <HomeEasterEggs />}
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/calls" component={Calls}/>
                <Route exact path="/Miit" component={Miit}/>
                <Route exact path="/games" component={Games}/>
                <Route exact path="/settings" component={Settings}/>
                <Route path="/:room" render={(params) => (
                  <Conversation {...params} />
                )}/>

                <Route component={Home}/>
              </Switch>

            </div>
          </Router>
        </div>
        {!isMobile && <Description />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  userList: state.userList
});

export default connect(mapStateToProps)(App);
