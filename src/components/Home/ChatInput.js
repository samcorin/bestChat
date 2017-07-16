import React from 'react';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import './ChatInput.css';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: ''
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.pushInputUp = this.pushInputUp.bind(this);
    this.focusUpdate = this.focusUpdate.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  scrollToBottom() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  pushInputUp() {
    const inputDiv = document.getElementById('chat-input');
    // set bottom 0
    inputDiv.scrollTop = inputDiv.scrollHeight;
  }

  focusUpdate(fn) {
    const input = document.getElementById("chat-input");
    input.addEventListener('focus', fn);
  }

  blurInput() {
    const input = document.getElementById('chat-input');
    input.blur();
  }
  componentDidMount() {
    const messageList = document.getElementById('messageList');

    // On touch outside
    messageList.addEventListener("touchstart", this.blurInput, true);
    messageList.addEventListener("click", this.blurInput, true);

    // Shows the last message
    this.scrollToBottom();

    // Add listener for when chat input is focused, keyboard pops up, you want last message to be visible.
    this.focusUpdate(this.scrollToBottom)
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // Fade animations for Send and Like icons
  fade() {
    document.getElementById("inputButton").classList.add('fadeIn');
    setTimeout(function() {
      document.getElementById("inputButton").classList.remove('fadeIn');
    }, 300)
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
    if(this.state.chatInput.length === 0) {
      this.fade()
    }
  }

  submitHandler(event) {
    event.preventDefault();
    document.getElementById("chat-input").focus();
    this.fade()
    this.setState({ chatInput: '' });
    this.props.onSend(this.state.chatInput);
  }

  likeHandler(event) {
    event.preventDefault();
    this.props.onSend('like');
  }

  render() {
    return (
      <div className="chatForm">
        <form className="form" onSubmit={this.submitHandler} autoComplete="off">
          <input type="text"
          id="chat-input"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Type a message"
          required
          className="chatInput" />
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
export default ChatInput;
// const mapStateToProps = (state) => ({
//   currentUser: state.currentUser
// });

// export default connect(mapStateToProps)(ChatInput);
