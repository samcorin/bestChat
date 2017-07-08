import React from 'react';
import {connect} from 'react-redux'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import './ChatInput.css';
import EmojiDependency from './../../utils/EmojiDependency';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: ''
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  // componentWillUnmount() {
    // remove unecessary listeners, et...
  // }

  componentDidMount() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;

    EmojiDependency().then((library) => {
      console.log(library.emojione)
      // this.marked = deps.marked.setOptions({
      //   highlight: (code) => deps.hljs.highlightAuto(code).value
      // });

      this.forceUpdate();
    });
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
    this.props.onSend(this.state.chatInput, this.props.room);
  }

  likeHandler(event) {
    event.preventDefault();
    this.props.onSend('like', this.props.room);
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

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(ChatInput);
