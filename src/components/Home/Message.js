import React from 'react';
import timely , {humanReadable} from './../../utils/timely';
import {urlify} from './../../utils/message';
import './Message.css';
import MessageDivider from './MessageDivider';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

class Message extends React.Component {
  render() {
    const msgDate = new Date(this.props.createdAt);
    const prevMsgDate = new Date(this.props.prevMsg);
    const type = this.props.type;

    // Conditions
    const divider = (msgDate.getDate() > prevMsgDate.getDate() || msgDate.getMonth() > prevMsgDate.getMonth());
    const myMessage = this.props.sender === this.props.currentUser;

    if (myMessage) {
      return (
        <div>
          {divider && <MessageDivider date={humanReadable(this.props.createdAt)}/> }
          <li>
            <div className={myMessage ? 'myMessage' : 'theirMessage'}>
              {type === 'like' ? (
                <FaThumbsOUp className='likeIcon' />
              ) : (
                <div>
                  <span className='myMessageTime'>{ timely(this.props.createdAt) }</span>
                  <span className='myMessageBody' id="MessageBody" dangerouslySetInnerHTML={{__html: urlify(this.props.text)}}></span>
                </div>
              )}
            </div>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          {divider && <MessageDivider date={humanReadable(this.props.createdAt)}/> }
          <li>
            <div className={myMessage ? 'myMessage' : 'theirMessage'}>
              {type === 'like' ? (
                <FaThumbsOUp className='likeIcon' />
              ) : (
                <div>
                  <span className='theirMessageBody' id="MessageBody" dangerouslySetInnerHTML={{__html: urlify(this.props.text)}}></span>
                  <span className='theirMessageTime'>{ timely(this.props.createdAt) }</span>
                </div>
              )}
            </div>
          </li>
        </div>
      );
    }
  }
}

export default Message;
