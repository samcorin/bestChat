import React from 'react';
import timely , {humanReadable} from './../../utils/timely';
import './Message.css';
import MessageDivider from './MessageDivider';

class Message extends React.Component {
  render() {
    const msgDate = new Date(this.props.createdAt);
    const prevMsgDate = new Date(this.props.prevMsg);


    if(msgDate.getDate() > prevMsgDate.getDate() || msgDate.getMonth() > prevMsgDate.getMonth()) {
      if (this.props.sender === this.props.currentUser) {
        return (
          <div>
            <MessageDivider date={humanReadable(this.props.createdAt)}/>
            <li>
              <div className='myMessage'>
                <span className='myMessageTime'>{ timely(this.props.createdAt) }</span>
                <span className='myMessageBody' id="MessageBody">{ this.props.text }</span>
              </div>
            </li>
          </div>
        );
      } else {
        return (
          <div>
            <MessageDivider date={humanReadable(this.props.createdAt)}/>
            <li>
              <div className='theirMessage'>
                <span className='theirMessageBody' id="MessageBody">{ this.props.text }</span>
                <span className='theirMessageTime'>{ timely(this.props.createdAt) }</span>
              </div>
            </li>
          </div>
        );
      }

    } else if (this.props.sender === this.props.currentUser) {
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
