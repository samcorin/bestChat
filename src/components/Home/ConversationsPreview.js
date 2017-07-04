import React, { Component } from 'react';
import {connect} from 'react-redux';
import './ConversationsPreview.css';
import './../App.css';
import { Link } from 'react-router-dom';
import timely from './../../utils/timely';

class ConversationsPreview extends Component {
  render() {
    const obj = this.props.conversations;
    const sortedMessages = Object.keys(obj).map((item) => {
      return obj[item]
    }).sort((a, b) => a[a.length -1].createdAt < b[b.length -1].createdAt);

    if(sortedMessages.length > 0 && this.props.userTable) {
      return (
        <div className="conversationPreviewWrapper">
          {sortedMessages.map((user, i) => {
            const propsRef = user[user.length - 1];
            const author = propsRef.sender === this.props.currentUser ? 'You' : propsRef.sender;
            const time = timely(propsRef.createdAt);

            // this.props.userTable takes a while to load
            const roomName = this.props.userTable[propsRef.roomId];

            // in case text is too long..
            const trimmedText = (propsRef.text.length + author.length) > 50 ?
            `${propsRef.text.substring(0, 50)}...` : propsRef.text;

            return (
              <Link key={i} to={`/${roomName}`} className="LinkStyle">
                <div className="conversationsPreview">
                  <img
                    alt={roomName}
                    src={roomName == 'admin-bot' ?
                         require('../../utils/img/admin-bot.svg') :
                         `https://api.adorable.io/avatars/60/${roomName}@adorable.io.png`}
                    className="previewPhoto" />
                  <div className="previewBody">
                    <p className="previewHeader">{roomName}</p>
                    <p className="previewText">{author}: {trimmedText}</p>
                  </div>
                  <p className="previewTime">{ time }</p>
                </div>
              </Link>
            )
          })}
        </div>
      );
    } else {
      return (
        <div className="loader">Loading...</div>
      );
    }
  }
}
//
// export default ConversationsPreview;
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
  userTable: state.userTable
});

export default connect(mapStateToProps)(ConversationsPreview);
