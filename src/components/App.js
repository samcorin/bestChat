import React, { Component } from 'react';
import {connect} from 'react-redux'
import Home from './Home/Home';
import Conversation from './Home/Conversation';
import Calls from './Calls';
import PreCall from './Calls/PreCall';
import Miit from './Miit/Miit';
import BottomNav from './BottomNav';
import Settings from './Settings';
import Games from './Games/Games';
import HomeEasterEggs from './../utils/EasterEggs/HomeEasterEggs';
import Description from './Description/index';
import './App.css';
import './../utils/loader.css';

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
      currentUser: '',
      call: false
    //   Miit: null,
    //   HomeEasterEggs: null,
    //   Calls: null,
    //   Settings: null,
    //   Games: null
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  
  // Code Splitting:
  // async componentDidMount() {
  //   const { default: Miit } = await import('./Miit/Miit');
  //   const { default: HomeEasterEggs } = await import('./../utils/EasterEggs/HomeEasterEggs');
  //   const { default: Calls } = await import('./Calls/Calls');
  //   const { default: Settings } = await import('./Settings');
  //   const { default: Games } = await import('./Games/Games');
  //   // const { default: Description } = await import('./Description/index');
    
  //   // Description: <Description />,
  //   this.setState({
  //     Miit: <Miit />,
  //     HomeEasterEggs: <HomeEasterEggs />,
  //     Calls: <Calls />,
  //     Settings: <Settings />,
  //     Games: <Games />
  //   })
  // }

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
              {!isMobile &&
                <img src={require("../utils/img/ios_template_min_3.png")}
                     alt="iPhone6s"
                     className="iphoneImg" />}
              {!isMobile && <HomeEasterEggs />}
              {this.state.call ? <PreCall /> :
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
              </Switch>}
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
