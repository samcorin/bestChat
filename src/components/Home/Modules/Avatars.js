import React from 'react';
import { Link } from 'react-router-dom';
import './Avatars.css';

export const AvatarOnline = ({user}) => {
  return (
    <Link to={`/${user}`} className="LinkStyle">
      <li className="listItem">
        <div className="avatarWrapper">
          <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
          <div className="online"></div>
        </div>
        <p className="name"><strong>{user}</strong></p>
      </li>
    </Link>
  );
}

export const AvatarOffline = ({user}) => {
  return (
    <Link to={`/${user}`} className="LinkStyle">
      <li className="listItem">
        <div className="avatarWrapper">
          <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
        </div>
        <p className="name">{user}</p>
      </li>
    </Link>
  );
}


export const AvatarOnlinePreview = ({user}) => {
  return (
    <Link to={`/${user}`} className="LinkStyle">
      <li className="previewAvatarlistItem">
        <div className="previewAvatarWrapper">
          <img alt={user} src={`https://api.adorable.io/avatars/60/${user}@adorable.io.png`} className="activeAvatar" rel='prefetch'/>
          <div className="online"></div>
        </div>
        <p className="previewAvatarOnlineName"><strong>{user}</strong></p>
      </li>
    </Link>
  );
}
