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

    if(sortedMessages.length > 0) {
      return (
        <div className="conversationPreviewWrapper">
          {sortedMessages.map((user, i) => {
            const propsRef = user[user.length - 1];
            const author = propsRef.sender === this.props.currentUser ? 'You' : propsRef.sender;
            const time = timely(propsRef.createdAt);

            // in case text is too long..
            const trimmedText = (propsRef.text.length + author.length) > 50 ?
            `${propsRef.text.substring(0, 50)}...` : propsRef.text;

            return (
              <Link key={i} to={`/${propsRef.roomId}`} className="LinkStyle">
                <div className="conversationsPreview">
                  <img
                    alt={propsRef.roomId}
                    src={propsRef.roomId == 'admin-bot' ?
                         require('../../utils/img/admin-bot.svg') :
                         `https://api.adorable.io/avatars/60/${propsRef.roomId}@adorable.io.png`}
                    className="previewPhoto" />
                  <div className="previewBody">
                    <p className="previewHeader">{propsRef.roomId}</p>
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
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(ConversationsPreview);
