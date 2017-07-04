import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {conversationReducer, currentUserReducer, userListReducer, activeUsersReducer, userTableReducer} from './reducers/index';

export var configure = (initialState = {}) => {
  var reducer = combineReducers({
    conversations: conversationReducer,
    currentUser: currentUserReducer,
    userList: userListReducer,
    activeUsers: activeUsersReducer,
    userTable: userTableReducer
  });

  // Store
  var store = createStore(reducer, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
