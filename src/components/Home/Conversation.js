import React from 'react';
import {connect} from 'react-redux'
import {objSwap} from './../../utils/objFunctions';
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
      createdAt: Date.now()
    }
    this.addMessage(messageObject);
  }

  addMessage(message) {
    const swapped = objSwap(this.props.userTable);
    // console.log("********** addMessage **********", swapped[this.props.match.params.room]) // ID

    usersRef.child(this.props.currentUser + '/conversations/' + swapped[this.props.match.params.room]).once('value', snapshot => {
      const roomName = snapshot.val();

      // If a reference exists in currentUser/conversations/:id, send the message there.
      if(roomName) {
        message.roomId = swapped[roomName];
        // console.log("message.roomId ", message.roomId, roomName)
        // message.roomId  -KoC_pzpR0uFHnvvPqbb, sticky-literature

        // add username..
        message.roomName = roomName;
        this.props.dispatch(addMessageToStore(message));
        conversationsRef.child(message.roomId).push(message);
      } else {
        // No reference exists, so one needs to be created.
        console.log("## SEND NEW ## >>> ", message)
        const cRef = usersRef.child(this.props.currentUser + '/conversations/' + this.props.match.params.room).push().key;
        message.roomId = cRef;
        this.props.dispatch(addMessageToStore(message));

        usersRef.child(this.props.currentUser + '/conversations/' + cRef).set(this.props.match.params.room);
        conversationsRef.child(cRef).push(message)

        usersRef.child(this.props.match.params.room + '/conversations/' + cRef).set(this.props.currentUser);
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
  conversations: state.conversations,
  userTable: state.userTable
});

export default connect(mapStateToProps)(Conversation);
