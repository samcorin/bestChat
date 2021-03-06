import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {objSwap} from './../../utils/objFunctions';
import {bot} from './../../utils/bot';
import ConversationNavBar from './ConversationNavBar';
import MessagesView from './MessagesView';
import ChatInput from './ChatInput';
import SendMessage from './../../utils/SendMessage';
import NewRoomMessage from './Modules/NewRoomMessage';
import {usersRef, conversationsRef} from './../../firebase/index';
import miit from './../Miit'
import { peerConnection } from './../../utils/WebRTC/peerConnection';
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
    this.getRoomId = this.getRoomId.bind(this);
    this.initCall = this.initCall.bind(this);
  }

  componentDidMount() {
    const roomId = this.getRoomId();
    miit.listen(roomId, this.props.currentUser, this.setRedirect);
    peerConnection.listen(roomId);
    this.setState({
      roomId: roomId
    });
  }

  startMiit() {
    const roomId = this.getRoomId();
    miit.start(roomId, this.props.currentUser, this.props.match.params.room, this.props.dispatch);
  }

  initCall() {
    const roomId = this.getRoomId();
    peerConnection.init(roomId);
  }

  setRedirect() {
    console.log("Conversation: redirect")
    this.setState({
      redirect: true
    })
  }

  getRoomId() {
    // return roomId
    const swapped = objSwap(this.props.userTable);
    return swapped[this.props.match.params.room];
  }

  sendHandler(message) {
    const roomId = this.getRoomId();

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
    SendMessage(this.props.currentUser, message, this.props.dispatch);
    
    this.setState({
      lastMessage: message
    })

    // Check if message is to bot, do bot stuff
    if(this.props.match.params.room === 'admin-bot') {
      const roomId = this.getRoomId();
      bot.roomId = roomId;
      bot.currentUser = this.props.currentUser;
      bot.dispatch = this.props.dispatch;
      bot.parseRequest(message);
    }

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
          startMiit={this.startMiit}
          initCall={this.initCall}/>
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
