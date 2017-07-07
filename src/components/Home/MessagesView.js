import React from 'react';
import {connect} from 'react-redux'
import Message from './Message';
import './MessagesView.css'

class MessagesView extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  componentDidUpdate() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  render() {
    if(this.props.conversations[this.props.room] === undefined) {
      return (
        <ul id='messageList' className="messageList"></ul>
      )
    } else {
      const messages = Object.keys(this.props.conversations[this.props.room]).map((message, i) => {
        var msg = this.props.conversations[this.props.room][message];
        var prevMsg = null;
        if(i > 0) {
          prevMsg = this.props.conversations[this.props.room][i-1];
        }

        return (
          <Message
            key={i}
            currentUser={this.props.currentUser}
            sender={msg.sender}
            text={msg.text}
            createdAt={msg.createdAt}
            prevMsg={prevMsg && prevMsg.createdAt} />
          );
        });

      return (
        <ul id='messageList' className="messageList">
          { messages }
        </ul>
      );
    }
  }
}

// MessagesView.defaultProps = {
//   messages: []
// };

// export default MessagesView;
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(MessagesView);
