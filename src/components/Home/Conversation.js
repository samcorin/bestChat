import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {objSwap} from './../../utils/objFunctions';
import ConversationNavBar from './ConversationNavBar';
import MessagesView from './MessagesView';
import ChatInput from './ChatInput';
import SendMessage from './Modules/SendMessage';
import NewRoomMessage from './Modules/NewRoomMessage';
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
      redirect: false,
      roomName: this.props.match.params.room,
      roomId: null
    }

    this.sendHandler = this.sendHandler.bind(this);
    this.roomOnline = this.roomOnline.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.startMiit = this.startMiit.bind(this);
  }

  startMiit() {
    if(!!this.state.roomId) {
      // clearInterval(timer);
      miit.start(this.state.roomId, this.props.currentUser, this.props.match.params.room, this.props, this.state.swapped);
      console.log("Miit started by " + this.props.currentUser + " in " + this.state.roomId)
    } else {
      // clearInterval(timer);
      console.log("NEW USER MESSAGE: ", this.props.currentUser, this.props.match.params.room)
      
      const swapped = objSwap(this.props.userTable);
      const roomId = swapped[this.props.match.params.room];
      
      let message = {
        sender: this.props.currentUser,
        text: 'Join me on Miit',
        createdAt: Date.now(),
        type: 'miit',
        roomName: this.props.match.params.room
      }
      console.log("this.props.currentUser, message ", this.props.currentUser, message)
      SendMessage(this.props.currentUser, message, this.props.dispatch);
      // miit.start(this.state.roomId, this.props.currentUser, this.props.match.params.room, this.props, this.state.swapped);

    }
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  sendHandler(message) {
    const swapped = objSwap(this.props.userTable);
    const roomId = swapped[this.props.match.params.room];

    const messageObject = {
      sender: this.props.currentUser,
      text: '',
      createdAt: Date.now(),
      roomId: roomId,
      roomName: this.props.match.params.room
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
    console.log("ADD MESSAGE: ", this.props, message, this.state)
    SendMessage(this.props.currentUser, message, this.props.dispatch);
    
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
    
    return (
      <div className="ConversationScreen">
        <ConversationNavBar 
          online={this.roomOnline()} 
          room={this.state.roomName} 
          setRedirect={this.setRedirect} 
          startMiit={this.startMiit}/>
        <MessagesView room={this.state.roomName} currentUser={this.props.currentUser}/>
        <ChatInput onSend={this.sendHandler}/>
      </div>
    )
  }
}

// export default Conversation;
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  userTable: state.userTable,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(Conversation);
