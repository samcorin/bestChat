import React, { Component } from 'react';
import {connect} from 'react-redux'
// Temp - for Material-ui - keep it lean
// import {Tabs, Tab} from 'material-ui/Tabs';
// import SwipeableViews from 'react-swipeable-views';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home/Home';
import Conversation from './Home/Conversation';
import Calls from './Calls/Calls';
import Miit from './Miit/Miit';
import Settings from './Settings';
import Description from './Description';
import UsernameEditor from './../utils/UsernameEditor';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

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

  componentDidMount() {
    const getScript = (source, callback) => {
      var el = document.createElement('script');
      el.onload = callback;
      el.src = source;
      document.body.appendChild(el);
    }

    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDuH6Zfh5uYlMJA6FuihhHlTMfrue7Au9A", function() {
      console.log("LOADING MAPS API")
    });
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
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/calls" component={Calls}/>
                <Route exact path="/Miit" component={Miit}/>
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

// export default App;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  userList: state.userList
});

export default connect(mapStateToProps)(App);
