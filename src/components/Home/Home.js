import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActiveUsers from './ActiveUsers';
import Groups from './Groups';
import ConversationsPreview from './ConversationsPreview';
import BottomNav from './../BottomNav';
import './../App.css';

// Icons
import MessagesPin from 'material-ui/svg-icons/communication/chat';
import Active from 'material-ui/svg-icons/notification/sync';
import Group from 'material-ui/svg-icons/social/group';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="homeView">
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            className="Tabs"
            style={{bottom:'0'}}>
            <Tab
              style={{backgroundColor: '#2196F3'}}
              label="Messages" disableTouchRipple={true} value={0} icon={<MessagesPin />} >
              <ConversationsPreview slideIndex={this.state.slideIndex} />
            </Tab>
            <Tab
              style={{backgroundColor: '#2196F3'}}
              label={this.props.activeUsers.length > 0 ? `Active (${(this.props.activeUsers.length)})` : 'Active'}
              disableTouchRipple={true} value={1} icon={<Active />}>
              <ActiveUsers slideIndex={this.state.slideIndex} />
            </Tab>
            <Tab
              style={{backgroundColor: '#2196F3'}}
              label="Groups" disableTouchRipple={true} value={2}icon={<Group />} >
              <Groups />
            </Tab>
          </Tabs>
          <BottomNav />
        </div>

      </MuiThemeProvider>
    );
  }
}

// export default Home;
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
  userList: state.userList,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(Home);
// is slideIndex necessary?
// Home screen - has a navbar, different for each sub-screen

// Swipeable views:

// <div>
//   <MuiThemeProvider>
//     <div className="mainView">
//       <Tabs
//         onChange={this.handleChange}
//         value={this.state.slideIndex}>
//         <Tab label="Messages" value={0} />
//         <Tab label="Active" value={1} />
//         <Tab label="Groups" value={2} />
//       </Tabs>
//       <SwipeableViews
//         index={this.state.slideIndex}
//         onChangeIndex={this.handleChange}>
//         <div className="slide">
//           <ConversationsPreview />
//         </div>
//         <div className="slide">
//           <ActiveUsers />
//         </div>
//         <div className="slide">
//           slide n°3
//         </div>
//       </SwipeableViews>
//     </div>
//   </MuiThemeProvider>
// </div>
