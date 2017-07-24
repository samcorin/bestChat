import React from 'react';
import {Redirect} from 'react-router-dom'
import timely , {humanReadable} from './../../utils/timely';
import {urlify} from './../../utils/message';
import MessageDivider from './MessageDivider';
import RedditMessage from './RedditMessage';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import {getPos, getPosition, setMarker} from './../../utils/mapFunctions';
import miit from './../Miit';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props)

    this.handleMiitAccept = this.handleMiitAccept.bind(this);
  }
  
  handleMiitAccept(e) {
    // function takes username and roomId
    miit.acceptInvite(this.props.currentUser, this.props.roomId)
  }

  render() {

    const msgDate = new Date(this.props.createdAt);
    const prevMsgDate = new Date(this.props.prevMsg);
    const type = this.props.type;
    // how old should link be?
    const isNew = ((Date.now() - this.props.createdAt) < 30000);

    // Conditions
    const divider = (msgDate.getDate() > prevMsgDate.getDate() || msgDate.getMonth() > prevMsgDate.getMonth());
    const myMessage = this.props.sender === this.props.currentUser;

    if (myMessage) {
      return (
        <div>
          {divider && <MessageDivider date={humanReadable(this.props.createdAt)}/> }
          <li>
            <div className='myMessage'>
              {type === 'like' ? (
                <FaThumbsOUp className='likeIcon' />
              ) : type === 'miit' ? (
                <div>
                  <span className='myMessageTime'>{ timely(this.props.createdAt) }</span>
                  <span className='myMessageBody' id="MessageBody">You sent an invite</span>
                </div>
              ) : type === 'reddit' ? (
                <div>
                  <span className='myMessageTime'>{ timely(this.props.createdAt) }</span>
                  <span className='myMessageBody' id="MessageBody"><img src={this.props.text}/></span>
                </div>
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
            <div className='theirMessage'>
              {type === 'like' ? (
                <FaThumbsOUp className='likeIcon' />
              ) : type === 'miit' ? (
                <div>
                  <span className='theirMessageBody' id="MessageBody">{this.props.text}
                    {isNew && 
                      <button id="miitAccept" onClick={this.handleMiitAccept}>OK</button>
                    }
                  </span>
                  <span className='theirMessageTime'>{ timely(this.props.createdAt) }</span>
                </div>
              ) : type === 'reddit' ? (
                <RedditMessage text={this.props.text} createdAt={this.props.createdAt} />
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
