import React from 'react'
import {connect} from 'react-redux'
import './ActiveUsers.css';

import { Link } from 'react-router-dom'

class ActiveUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  render() {
    if (Object.keys(this.props.userList).length > 0) {
      var result1 = [], result2 = [];
      const arr = this.props.userList;

      // active users
      for (var i = 0; i < arr.length; i++) {
        if (this.props.activeUsers.indexOf(arr[i]) !== -1) {
          // user is online, push to top of array
          result1.push(arr[i]);
        } else {
          // user is offline, add to bottom part
          result2.push(arr[i]);
        }
      }

      // These should be displayed separately: Online / Offline
      var result = result1.concat(result2);

      // with a divider, have 2 separate loops
      const users = result.map((user, i) => {
        if(this.props.activeUsers.indexOf(user) !== -1) {
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
        } else {
          return (
            <Link key={user} to={`/${user}`} className="LinkStyle">
              <li className="listItem">
                <div className="avatarWrapper">
                  <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
                </div>
                <p className="name">{user}</p>
              </li>
            </Link>
          )
        }
      })

      return (
        <div>
          <ul className="userList">
            {users}
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
  conversations: state.conversations,
  currentUser: state.currentUser,
  userList: state.userList,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(ActiveUsers);
