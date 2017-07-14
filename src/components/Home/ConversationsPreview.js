import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import timely from './../../utils/timely';
import {sortMessages, latestMessages} from './../../utils/objFunctions';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import {AvatarOnlinePreview} from './Modules/Avatars.js'
import MeetPreview from './../Miit/MiitPreview';
import './ConversationsPreview.css';
import './../App.css';

class ConversationsPreview extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let convLen = Object.keys(this.props.conversations).length;
    let tableLen = Object.keys(this.props.userTable).length;

    // if(previewMessages.length > 0 && Object.keys(this.props.userTable).length) {
    // THIS BREAKS IF YOU MESSAGE SOMEONE NEW< table !== conv
    if(convLen > 0 && tableLen === convLen) {
      let previewMessages = latestMessages(this.props.conversations)

      // Clean up this code
      return (
        <div className="conversationPreviewWrapper">
          {previewMessages.map((message) => {

            const author = message.sender === this.props.currentUser ? 'You' : message.sender;
            const type = message.type;

            // if less than a week, display day name
            const msgDate = new Date(message.createdAt);
            const today = new Date();

            // This is not correct
            // should look at before midnight..
            const beforeToday = (msgDate.getDate() < today.getDate() || msgDate.getMonth() < today.getMonth());

            // Day, Month, Date, Year
            const timeElements = msgDate.toDateString().split(' ')

            // Default time display
            // this messes up the order....
            const time = beforeToday ?
              timeElements[0] :
              timely(message.createdAt);

            // this.props.userTable takes a while to load
            const roomName = this.props.userTable[message.roomId];

            // in case text is too long..
            const trimmedText = (message.text.length + author.length) > 50 ?
            `${message.text.substring(0, 50)}...` : message.text;

            return (
              <Link key={message.createdAt} to={`/${roomName}`} className="LinkStyle">
                <div className="conversationsPreview">
                  <img
                    src={roomName === 'admin-bot' ?
                         require('../../utils/img/admin-bot.svg') :
                         `https://api.adorable.io/avatars/60/${roomName}@adorable.io.png`}
                    alt={roomName}
                    className="previewPhoto" />
                  <div className="previewBody">
                    <div className="previewHeader">
                      <span className="previewName">{roomName}</span>
                      <p className="previewTime">{ time }</p>
                    </div>
                    {type === 'like' ? (
                      <p className="previewText">{author}: <FaThumbsOUp className="previewLike" /></p>
                    ) : type === 'miit' ? (
                      <MeetPreview author={author} createdAt={message.createdAt} text={message.text} roomId={message.roomId} currentUser={this.props.currentUser}/>
                    ) : (
                      <p className="previewText">{author}: {trimmedText}</p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
          {this.props.activeUsers.length > 0 &&
            <div id="activeNow">
              <p className="activeNowHeader"><strong>Active now</strong></p>
              <ul id="activeNowUl">
                {this.props.activeUsers.map((user, i) => {
                  return (
                    <AvatarOnlinePreview key={user} user={user} />
                  )
                })}
              </ul>
            </div>
          }
        </div>
      );
    } else {
      return (
        <div className="loader">Loading...</div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
  userTable: state.userTable,
  activeUsers: state.activeUsers
});

export default connect(mapStateToProps)(ConversationsPreview);
