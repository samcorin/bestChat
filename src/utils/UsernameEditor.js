import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UsernameEditor.css';
import nameGen from './../utils/nameGen';

class UsernameEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      exampleUsername: nameGen(),
      verified: false
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  textChangeHandler(event)  {
    this.setState({
      username: event.target.value
    });
  }

  randomUsername() {
    this.setState({
      username: nameGen()
    });
  }

  submitHandler(event) {
    event.preventDefault();
    if(this.props.userList.indexOf(this.state.username) !== -1) {
      // try again
      console.log("Try again");
    } else {
      console.log(`Welcome, ${this.state.username}!`);
      this.setState({
        verified: true
      })

      // continue
      // /delay fade out to allow loading???????
    }

    // remove overlay
    // set localStorage usename
    // start app
  }

  render() {
    console.log("This state username: ", this.state.username)
    return (
      <div className="usernameEditor">
        <div>
          <h1>Who are you?</h1>
          <form className="form" onSubmit={this.submitHandler} autoComplete="off">
            <input type="text"
            id="usernameInput"
            onChange={this.textChangeHandler}
            value={this.state.username}
            placeholder={this.state.exampleUsername}
            required
            autoFocus
            className="usernameInput" />
          </form>
      </div>
      {this.state.verified && <div className="usernameSuccess"> OK!!!!!</div>}
    </div>
    )
  }
}


// export default UsernameEditor;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  userList: state.userList
});

export default connect(mapStateToProps)(UsernameEditor);
