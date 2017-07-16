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
      roomName: this.props.match.params.room
    }

    this.sendHandler = this.sendHandler.bind(this);
    this.roomOnline = this.roomOnline.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.startMiit = this.startMiit.bind(this);
  }

  componentDidMount() {
    // Not sure I need this
    const swapped = objSwap(this.props.userTable);
    const roomId = swapped[this.props.match.params.room];
    this.setState({
      roomId: roomId
    })
  }

  startMiit() {
    if(!!this.state.roomId) {
      // clearInterval(timer);
      miit.start(this.state.roomId, this.props.currentUser, this.props.match.params.room, this.props, this.state.swapped);
      console.log("Miit started by " + this.props.currentUser + " in " + this.state.roomId)
    } else {
      // clearInterval(timer);
      console.log("NEW USER MESSAGE: ", this.props.currentUser, this.props.match.params.room)
      // SendMessage(this.props.currentUser, message, this.state.roomName, this.state.roomId, this.props.dispatch);
      NewRoomMessage(this.props.currentUser, this.state.roomName, this.props.dispatch);
    }
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  sendHandler(message) {
    const messageObject = {
      sender: this.props.currentUser,
      text: '',
      createdAt: Date.now(),
      roomId: this.state.roomId,
      roomName: this.state.roomName
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
    // shouldn't we check here if it exists?
    console.log("addmessage: message: ", message)
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
        <MessagesView room={this.state.roomName} />
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
