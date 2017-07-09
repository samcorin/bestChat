import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActiveUsers from './ActiveUsers';
import Groups from './Groups';
import ConversationsPreview from './ConversationsPreview';
import BottomNav from './../BottomNav';
import Tabsly from './../../utils/Tabsly';
import './../App.css';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  componentDidMount() {
    Tabsly();
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  // if you want to replace material tabs, do it here.
  // Could use dragendjs?
  render() {
    return (
        <div className="homeView">
          <ul id="nav-tab" className="nav">

            <li id="tab-content1" className="active">
              <p className="aLink active">Messages</p>
            </li>

            <li id="tab-content2">
              <p className="aLink">Users</p>
            </li>

            <li id="tab-content3">
              <p className="aLink">Groups</p>
            </li>

          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="content1">
              <ConversationsPreview slideIndex={this.state.slideIndex} />
            </div>
            <div className="tab-pane" id="content2">
              <ActiveUsers slideIndex={this.state.slideIndex} />
            </div>
            <div className="tab-pane" id="content3">
              <Groups />
            </div>
          </div>
          <BottomNav />
        </div>

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


// <ul id="nav-tab" class="nav">
//   <li class="active"><a href="#tab1">Tab um</a></li>
//   <li><a href="#tab2">Tab dois</a></li>

// </ul>

// <!-- Tab panes -->
// <div class="tab-content">
//   <div class="tab-pane active" id="tab1">
//     Conteúdo Primário</div>
//   <div class="tab-pane" id="tab2">
//     Conteúdo Secundário</div>

// </div>





// BACKUP

// <MuiThemeProvider>
//         <div className="homeView">
//           <Tabs
//             onChange={this.handleChange}
//             value={this.state.slideIndex}
//             className="Tabs"
//             style={{bottom:'0'}}>
//             <Tab
//               style={{backgroundColor: '#2196F3'}}
//               label="Messages" disableTouchRipple={true} value={0}>
//               <ConversationsPreview slideIndex={this.state.slideIndex} />
//             </Tab>
//             <Tab
//               style={{backgroundColor: '#2196F3'}}
//               label={this.props.activeUsers.length > 0 ? `Active (${(this.props.activeUsers.length)})` : 'Active'}
//               disableTouchRipple={true} value={1}>
//               <ActiveUsers slideIndex={this.state.slideIndex} />
//             </Tab>
//             <Tab
//               style={{backgroundColor: '#2196F3'}}
//               label="Groups" disableTouchRipple={true} value={2}>
//               <Groups />
//             </Tab>
//           </Tabs>
//           <BottomNav />
//         </div>

//       </MuiThemeProvider>
