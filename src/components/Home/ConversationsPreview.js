import React, { Component } from 'react';
import {connect} from 'react-redux';
import './ConversationsPreview.css';
import './../App.css';
import { Link } from 'react-router-dom';
import timely from './../../utils/timely';
import {sortMessages} from './../../utils/objFunctions';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

class ConversationsPreview extends Component {

  // INEFFICIENT!!
  // Abstract this out, and figure out how to make it faster

  render() {
    const obj = this.props.conversations;

    // returns an array of messages for each conversation. Newest conversation on top.
    const sortedMessages = sortMessages(obj);

    // NEEDS IMPROVEMENT
    if(sortedMessages.length > 0 && Object.keys(this.props.userTable).length) {
      return (
        <div className="conversationPreviewWrapper">
          {sortedMessages.map((user, i) => {
            const propsRef = user[user.length - 1];
            const author = propsRef.sender === this.props.currentUser ? 'You' : propsRef.sender;
            const type = propsRef.type;

            // if less than a week, display day name
            const msgDate = new Date(propsRef.createdAt);
            const today = new Date();

            // This is not correct
            const beforeToday = (msgDate.getDate() < today.getDate() || msgDate.getMonth() < today.getMonth());

            // Day, Month, Date, Year
            const timeElements = msgDate.toDateString().split(' ')

            // Default time display
            const time = beforeToday ?
              timeElements[0] :
              timely(propsRef.createdAt);

            // this.props.userTable takes a while to load
            const roomName = this.props.userTable[propsRef.roomId];

            // in case text is too long..
            const trimmedText = (propsRef.text.length + author.length) > 50 ?
            `${propsRef.text.substring(0, 50)}...` : propsRef.text;

            return (
              <Link key={i} to={`/${roomName}`} className="LinkStyle">
                <div className="conversationsPreview">
                  <img
                    src={roomName == 'admin-bot' ?
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
                    ) : (
                      <p className="previewText">{author}: {trimmedText}</p>
                    )}
                  </div>
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
