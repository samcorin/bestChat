import React from 'react';
import {connect} from 'react-redux'
import {objSwap} from './../../utils/objFunctions';
// import {addMessageToStore, updateUserTable} from './../../actions/index';
import MessagesView from './MessagesView';
import ConversationNavBar from './ConversationNavBar';
import ChatInput from './ChatInput';
import SendMessage from './Modules/SendMessage';
import {usersRef, conversationsRef} from './../../firebase/index';
import './Conversation.css';

// render()
// if(this.props.userList.indexOf(match.params.room) == -1)
// location.assign("http://www.mozilla.org");
// const Conversation = ({ match }) => (
class Conversation extends React.Component{
  constructor(props) {
    super(props);

    this.sendHandler = this.sendHandler.bind(this);
    this.roomOnline = this.roomOnline.bind(this);
  }

  sendHandler(message, room) {
    const messageObject = {
      sender: this.props.currentUser,
      text: '',
      createdAt: Date.now(),
    }

    // add appropriate message type. Later add to this.
    if(message === 'like') {
      messageObject['type'] = 'like';
      this.addMessage(messageObject);
    } else {
      messageObject['text'] = message;
      messageObject['type'] = 'default';
      this.addMessage(messageObject);
    }
  }

  addMessage(message) {
    const swapped = objSwap(this.props.userTable);

    // Quarantine
    SendMessage(this.props.currentUser, message, swapped, this.props.match.params.room, usersRef, conversationsRef, this.props);
    this.setState({
      lastMessage: message
    })
  }

  roomOnline() {
    return this.props.activeUsers.indexOf(this.props.match.params.room) !== -1;
  }

  render() {
    const room = this.props.match.params.room;
    const swapped = objSwap(this.props.userTable);
    
    return (
      <div className="ConversationScreen">
        <ConversationNavBar online={this.roomOnline()} room={room} />
        <MessagesView room={room} />
        <ChatInput onSend={this.sendHandler} room={room} />
      </div>
    )  }
}

// export default Conversation;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  conversations: state.conversations,
  userTable: state.userTable,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(Conversation);
