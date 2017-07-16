import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {objSwap} from './../../utils/objFunctions';
import MessagesView from './MessagesView';
import ConversationNavBar from './ConversationNavBar';
import ChatInput from './ChatInput';
import SendMessage from './Modules/SendMessage';
import {usersRef, conversationsRef} from './../../firebase/index';
import miit from './../Miit'
import './Conversation.css';

// render()
// if(this.props.userList.indexOf(match.params.room) == -1)
// location.assign("http://www.mozilla.org");

class Conversation extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false
    }

    this.sendHandler = this.sendHandler.bind(this);
    this.roomOnline = this.roomOnline.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.startMiit = this.startMiit.bind(this);
  }

  // This user isthe initiator, that means that you need to push your coords to the db
  startMiit() {
    // Ensure values are defined
    
    let counter = 0;
    let timer = setInterval(() => {
      if(counter >= 50) {
        clearInterval(timer);
        console.log("Error loading props.")
      }

      const swapped = objSwap(this.props.userTable);
      const roomId = swapped[this.props.match.params.room];
      
      // Check if the conversation exists
      if(!!roomId && !!swapped) {
        clearInterval(timer);
        miit.start(roomId, this.props.currentUser, this.props.room, this.props, swapped);
        console.log("Miit started by " + this.props.currentUser + " in " + roomId)
      } else {
        clearInterval(timer);
        // NewRoomMessage(this.props.currentUser, this.props.room, this.props);
        console.log("Room initiated")
      }
    },10);
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
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
    if (this.state.redirect) {
      return <Redirect push to='/Miit' />;
    }
    
    const room = this.props.match.params.room;
    const swapped = objSwap(this.props.userTable);
    
    return (
      <div className="ConversationScreen">
        <ConversationNavBar online={this.roomOnline()} room={room} setRedirect={this.setRedirect} startMiit={this.startMiit}/>
        <MessagesView room={room} />
        <ChatInput onSend={this.sendHandler} room={room} />
      </div>
    )
  }
}

// export default Conversation;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  conversations: state.conversations,
  userTable: state.userTable,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(Conversation);
