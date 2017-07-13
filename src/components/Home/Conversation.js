import React from 'react';
import {connect} from 'react-redux'
import {objSwap} from './../../utils/objFunctions';
import {addMessageToStore, updateUserTable} from './../../actions/index';
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
  // componentWillMount() {
    // var n = document.getElementsByClassName('chatScreenMob')[0];
  // }

  addMessage(message) {
    const swapped = objSwap(this.props.userTable);

    usersRef.child(this.props.currentUser + '/conversations/' + swapped[this.props.match.params.room]).once('value', snapshot => {
      const roomName = snapshot.val();

      // If a reference exists in currentUser/conversations/:id, send the message there.
      if(roomName) {
        message.roomId = swapped[roomName];

        // add username..
        message.roomName = roomName;
        this.props.dispatch(addMessageToStore(message));
        conversationsRef.child(message.roomId).push(message);

      } else {

        // No reference exists, so one needs to be created.
        const cRef = usersRef.child(this.props.currentUser + '/conversations/' + this.props.match.params.room).push().key;
        message.roomId = cRef;

        // Push message to store
        message.roomName = this.props.match.params.room;
        this.props.dispatch(addMessageToStore(message));

        // Update userTable with -> { ID: NAME }
        var userTableObj = {
          id: cRef,
          name: this.props.match.params.room
        };

        this.props.dispatch(updateUserTable(userTableObj));

        // Push message to db
        conversationsRef.child(cRef).push(message)

        // Add a reference to this conversation for both users
        usersRef.child(this.props.currentUser + '/conversations/' + cRef).set(this.props.match.params.room);
        usersRef.child(this.props.match.params.room + '/conversations/' + cRef).set(this.props.currentUser);
      }
    })

    this.setState({
      lastMessage: message
    })
  }

  roomOnline() {
    return this.props.activeUsers.indexOf(this.props.match.params.room) !== -1;
  }

  render() {
    const room = this.props.match.params.room;
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
