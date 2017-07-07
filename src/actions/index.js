// Add current user to store
export const addCurrentUser = (username) => {
  return {
    type: 'ADD_CURRENT_USER',
    username
  }
}

// Adds all users in DB to store
export const updateUserList = (userList) => {
  return {
    type: 'UPDATE_USER_LIST',
    userList
  }
}

// Add active users to store
export const addActiveUsers = (users) => {
  return {
    type: 'ADD_ACTIVE_USERS',
    activeUsers: users
  }
}

// When new user is added to DB, listen for event and add to store.
export const addUserToList = (username) => {
  return {
    type: 'ADD_USER_TO_LIST',
    username
  }
}

// User sends a message, it's added to store
export const addMessageToStore = (message) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      sender: message.sender,
      text: message.text,
      roomId: message.roomId,
      createdAt: message.createdAt
    },
    roomName: message.roomName
  }
}

export const updateUserTable = (data) => {
  return {
    type: 'UPDATE_USER_TABLE',
    payload: data
  }
}

// Prepare to add current user's messages to store
export const startFetchMessages = (conversations) => {
  return (dispatch, getState) => {
    dispatch(fetchMessages({ id: conversations.id, data: conversations.data }));
  };
};

// Add all of current user's messages to store
export const fetchMessages = (conversation) => {
  return {
    type: 'ADD_MESSAGES',
    id: conversation.id,
    payload: conversation.data
  }
}
