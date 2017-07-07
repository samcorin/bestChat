import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ActiveUsers.css';
import { Link } from 'react-router-dom'

class ActiveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  render() {

    if (Object.keys(this.props.userList).length > 0) {
      var online = [],
          offline = [];
      const arr = this.props.userList;

      // active users
      for (var i = 0; i < arr.length; i++) {
        if (this.props.activeUsers.indexOf(arr[i]) !== -1) {
          // user is online, push to top of array
          online.push(arr[i]);
        } else {
          // user is offline, add to bottom part
          offline.push(arr[i]);
        }
      }

      const onlineUsers = online.map((user, i) => {
        return (
          <Link key={user} to={`/${user}`} className="LinkStyle">
            <li className="listItem">
              <div className="avatarWrapper">
                <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
                <div className="online"></div>
              </div>
              <p className="name"><strong>{user}</strong></p>
            </li>
          </Link>
        )
      })

      const offlineUsers = offline.map((user, i) => {
        return (
          <Link key={user} to={`/${user}`} className="LinkStyle">
            <li className="listItem">
              <div className="avatarWrapper">
                <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
              </div>
              <p className="name">{user}</p>
            </li>
          </Link>
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
