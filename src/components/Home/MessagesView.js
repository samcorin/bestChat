import React from 'react';
import {connect} from 'react-redux'
import Message from './Message';
import './MessagesView.css'

class MessagesView extends React.Component {
  constructor(props) {
    super(props);

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }
  
  componentDidMount() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;

    // Do I need this????
    // var el = document.getElementById('messageList');
    // el.addEventListener('resize', this.handleWindowSizeChange);
   
    // const miitResponse = () => {
    //   console.log("OK YOU RESPONESDD")
    // }
    
    // const accept = document.getElementById('miitAccept');
    // accept.addEventListener('click', miitResponse); // false / true????
  }

  componentDidUpdate() {
    const messageDiv = document.getElementById('messageList');
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }

  componentWillUnmount() {
    var el = document.getElementById('messageList');
    el.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    document.getElementById('messageList').style.height = document.getElementById('messageList').clientHeight;
  };

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
            type={msg.type}
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
// export default MessagesView;
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(MessagesView);
