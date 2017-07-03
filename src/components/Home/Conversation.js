import React from 'react';
import {connect} from 'react-redux'
import {socket} from './../../utils/webSocketsClient';
import {addMessageToStore} from './../../actions/index';
import MessagesView from './MessagesView';
import ConversationNavBar from './ConversationNavBar';
import ChatInput from './ChatInput';
import {usersRef} from './../../firebase/index';
import './Conversation.css';

// render()
// if(this.props.userList.indexOf(match.params.room) == -1)
// location.assign("http://www.mozilla.org");
// const Conversation = ({ match }) => (
class Conversation extends React.Component{
  constructor(props) {
    super(props);

    this.sendHandler = this.sendHandler.bind(this);
  }

  sendHandler(message, room) {
    // sending the message out, it gets relayed to others, receiver gets it.. (then add to store, db for them too)
    if(message === 'like') {
      console.log("SOMEONE LIKES THIS")
    }
    // ?>moment
    const messageObject = {
      sender: this.props.currentUser,
      text: message,
      createdAt: Date.now(),
      roomId: room
    }

    socket.send(JSON.stringify({
      type: 'message',
      message: messageObject
    }));

    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Adds to DB for self after sending, not the
    this.props.dispatch(addMessageToStore(message));
    usersRef.child(message.sender + '/conversations/' + message.roomId).push(message);

    // save for <Description />
    this.setState({
      lastMessage: message
    })
  }

  render() {
    return (
      <div className="ConversationScreen">
        <ConversationNavBar room={this.props.match.params.room} />
        <MessagesView room={this.props.match.params.room} />
        <ChatInput onSend={this.sendHandler} room={this.props.match.params.room} />
      </div>
    )
  }
}

// export default Conversation;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  conversations: state.conversations
});

export default connect(mapStateToProps)(Conversation);
