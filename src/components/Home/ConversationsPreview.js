import React, { Component } from 'react';
import {connect} from 'react-redux';
import './ConversationsPreview.css';
import './../App.css';
import { Link } from 'react-router-dom';
import timely from './../../utils/timely';
import {sortMessages, latestMessages} from './../../utils/objFunctions';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

class ConversationsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestMessages: []
    }
  }

  // this.setState({
  //   latestMessages: latestMessages(this.props.conversations)
  // })

  // INEFFICIENT!!
  // Abstract this out, and figure out how to make it faster
  render() {
    // NEEDS IMPROVEMENT

    // returns an array of messages for each conversation. Newest conversation on top.
    let convLen = Object.keys(this.props.conversations).length;
    let tableLen = Object.keys(this.props.userTable).length;

    // do stuff then render to page
    // if(previewMessages.length > 0 && Object.keys(this.props.userTable).length) {
    if(convLen > 0 && tableLen === convLen) {
      let previewMessages = latestMessages(this.props.conversations)
      console.log("RENDER")
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

const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
  userTable: state.userTable
});

export default connect(mapStateToProps)(ConversationsPreview);
