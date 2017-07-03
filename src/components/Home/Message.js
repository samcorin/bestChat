import React from 'react';
import timely from './../../utils/timely';
import './Message.css';

class Message extends React.Component {
  render() {
    if (this.props.sender === this.props.currentUser) {
      return (
        <li>
          <div className='myMessage'>
            <span className='myMessageTime'>{ timely(this.props.createdAt) }</span>
            <span className='myMessageBody' id="MessageBody">{ this.props.text }</span>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <div className='theirMessage'>
            <span className='theirMessageBody' id="MessageBody">{ this.props.text }</span>
            <span className='theirMessageTime'>{ timely(this.props.createdAt) }</span>
          </div>
        </li>
      );
    }
  }
}

export default Message;

// createdAt
// 1498375371
// roomId
// :
// "admin-bot"
// text
// :
// "Welcome!"
// username
// :
// "admin-bot"
