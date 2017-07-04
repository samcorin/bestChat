import React from 'react';
import {connect} from 'react-redux'
import {socket} from './../../utils/webSocketsClient';
import {addMessageToStore} from './../../actions/index';
import MessagesView from './MessagesView';
import ConversationNavBar from './ConversationNavBar';
import ChatInput from './ChatInput';
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
  }

  sendHandler(message, room) {
    // sending the message out, it gets relayed to others, receiver gets it.. (then add to store, db for them too)
    if(message === 'like') {
      console.log("SOMEONE LIKES THIS")
    }

    // Can't send this until I get the conversation.key
    const messageObject = {
      sender: this.props.currentUser,
      text: message,
      createdAt: Date.now(),
      room: this.props.match.params.room
    }
    this.addMessage(messageObject);
  }

  addMessage(message) {

    // Wait for room key to send to store.
    // this.props.dispatch(addMessageToStore(message));
    console.log("######## NEW MESSAGE ####### ", message)
    // Checks wether currentUser has a reference to a conversation with the receiver: returns ID

    usersRef.child(this.props.currentUser + '/conversations/' + this.props.match.params.room).once('value', snapshot => {
      const messageRef = snapshot.val();

      if(messageRef) {
        message.roomId = messageRef;
        this.props.dispatch(addMessageToStore(message));
        conversationsRef.child(messageRef).push(message);
        // const tempRoomId = message.roomId;
        // message.roomId = message.sender;
        // then add it for the other person
        // usersRef.child(message.roomId + '/conversations/' + this.props.currentUser).set(cRef);

      } else {
        console.log("## SEND NEW ## >>> ", message)
        const cRef = usersRef.child(this.props.currentUser + '/conversations/' + this.props.match.params.room).push().key;
        message.roomId = cRef;
        this.props.dispatch(addMessageToStore(message));

        usersRef.child(this.props.currentUser + '/conversations/' + this.props.match.params.room).set(cRef);
        conversationsRef.child(cRef).push(message)

        usersRef.child(this.props.match.params.room + '/conversations/' + this.props.currentUser).set(cRef);
      }
    })

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
