import React from 'react';
import {connect} from 'react-redux'
import BottomNav from './../components/BottomNav';
import './App.css';

class Settings extends React.Component {

  render() {
    return (
      <div className="waiting">
        <div>
          <h3>Settings</h3>
          <p>{`Hello, ${this.props.currentUser}!`}</p>
        </div>
        <BottomNav />
      </div>
    );
  }
}

// export default Settings;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Settings);
