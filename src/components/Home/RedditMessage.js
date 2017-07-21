import React from 'react';
import timely from './../../utils/timely';

export const RedditMessage = ({text, createdAt}) => {
  // Parse JSON into things.
  
  
  return (
    <div>
      <span className='theirMessageBody' id="MessageBody"><img src={text}/></span>
      <span className='theirMessageTime'>{ timely(createdAt) }</span>
    </div>
  )
}

export default RedditMessage