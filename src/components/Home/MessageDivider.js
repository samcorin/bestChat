import React from 'react';
import './Message.css';

const MessageDivider = ({date}) => (
  <div className="divider">
    <span className="innerDivider">
      <span className="dividerText">{date}</span>
    </span>
  </div>
)

export default MessageDivider;
