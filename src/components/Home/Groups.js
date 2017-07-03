import React from 'react'
import {connect} from 'react-redux'
import MdGroupAdd from 'react-icons/lib/md/group-add';
import './Groups.css';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="groups">
        <div className="createGroup">
          <div className="createGroupIcon"><MdGroupAdd /></div>
          <p>Create Group</p>
        </div>
      </div>
    );
  }
}

// export default ActiveUsers;
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
  userList: state.userList,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(Groups);
