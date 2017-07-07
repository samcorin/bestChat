import React from 'react';
import {connect} from 'react-redux'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import './ChatInput.css';

const emojione = () => import('emojione');

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: ''
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  componentDidMount() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
    emojione().then(loadedModule => {
       window.emojione = loadedModule;
    })

    document.getElementById("chat-input").addEventListener('input', function(e) {
        console.log("EVENT: ", e.target.innerText)
    }, false);
  }

  componentDidUpdate() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  // Fade animations for Send and Like icons
  fade() {
    document.getElementById("inputButton").classList.add('fadeIn');
    setTimeout(function() {
      document.getElementById("inputButton").classList.remove('fadeIn');
    }, 300)
  }

  textChangeHandler(event)  {
    // event.target.value
    const input = document.getElementById('chat-input').value;
    const output = window.emojione.toImage(input);
    document.getElementById('chat-input').value = output;

    this.setState({ chatInput: event.target.value });
    if(this.state.chatInput.length === 0) {
      this.fade()
    }
  }

  submitHandler(event) {
    event.preventDefault();
    document.getElementById("chat-input").focus();
    this.fade()
    this.props.onSend(this.state.chatInput, this.props.room);
    this.setState({ chatInput: '' });
  }

  likeHandler(event) {
    event.preventDefault();
    // this.props.onSend('like', this.props.room);
  }

  render() {
    return (
      <div className="chatForm">
        <form className="form" onSubmit={this.submitHandler} autoComplete="off">
          <div
          contentEditable="true"
          id="chat-input"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          data-placeholder="Type a message"
          required
          className="chatInput"></div>

          {this.state.chatInput.length ?
            <div id="inputButton" onClick={this.submitHandler}>
              <div><FaPaperPlane /></div>
            </div> :
            <div id="inputButton" onClick={this.likeHandler}>
              <div><FaThumbsOUp /></div>
            </div>
          }
        </form>
      </div>
    );
  }
}

// autoFocus
// <input type="text"
//           id="chat-input"
//           onChange={this.textChangeHandler}
//           value={this.state.chatInput}
//           placeholder="Type a message"
//           required
//           className="chatInput" />

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(ChatInput);
