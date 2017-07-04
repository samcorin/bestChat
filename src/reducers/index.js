// What the heck is state? == messages: conversationReducer
function addMessage(state, action) {
  const {payload} = action;
  const {roomId} = payload;
  // if the conversation exists
  if(state[roomId]) {
    return {
      ...state,
      [roomId]: state[roomId].concat(action.payload)
    };
  } else {
    // create a new 'room'
    return {
    ...state,
    [roomId]: [action.payload]
  };
  }
}

// Add all messages to store
export var conversationReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return addMessage(state, action);
    case 'ADD_MESSAGES':
      return {
        ...state,
        [action.id]: action.payload
      };
    default:
      return state;
  }
}

// Add current user to store
export var currentUserReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_CURRENT_USER':
      return action.username;
    default:
      return state;
  }
}

export var userTableReducer = (state = {}, action) => {
  console.log(state, action)
  switch(action.type) {
    case 'UPDATE_USER_TABLE':
      return action.payload;
    default:
      return state;
  }
}

// Add active users to store
export var activeUsersReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ACTIVE_USERS':
      return action.activeUsers;
    case 'REMOVE_ACTIVE_USERS':
      return action.activeUsers;
    default:
      return state;
  }
}


// Add user list to store
export var userListReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_USER_LIST':
      return action.userList
    case 'ADD_USER_TO_LIST':
      return [
        ...state,
        action.username
      ]
    default:
      return state;
  }
}
