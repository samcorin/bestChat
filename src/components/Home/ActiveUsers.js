import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ActiveUsers.css';
import {AvatarOnline, AvatarOffline} from './Modules/Avatars.js'

class ActiveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  render() {
    if (Object.keys(this.props.userList).length > 0) {
      var online = [], offline = [];
      const arr = this.props.userList;

      // User Status
      for (var i = 0; i < arr.length; i++) {
        if (this.props.activeUsers.indexOf(arr[i]) !== -1) {
          online.push(arr[i]);
        } else {
          offline.push(arr[i]);
        }
      }

      const onlineUsers = online.map((user, i) => {
        return (
          <AvatarOnline key={user} user={user} />
        )
      })

      const offlineUsers = offline.map((user, i) => {
        return (
          <AvatarOffline key={user} user={user} />
        );
      })

      return (
        <div className="userList">
          <div className="userListDivider"><strong>Online</strong></div>
          <ul>
            {onlineUsers}
          </ul>
          <div className="userListDivider"><strong>Offline</strong></div>
          <ul>
            {offlineUsers}
            <li className="listSpacer"></li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <p>Such empty</p>
      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(ActiveUsers);
