import React, { Component } from 'react';
import {connect} from 'react-redux'
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
              <p className="aLink">
                {this.props.activeUsers.length > 0 ? `Active (${(this.props.activeUsers.length)})` : 'Active'}
              </p>
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
