import firebase, {usersRef, conversationsRef, database, connectedRef} from './firebase/index';
import {startFetchMessages, addCurrentUser, addUserList, addUserToList} from './actions/index';
import nameGen from './utils/nameGen'
import {objKeysToArray, objToArray} from './utils/objToArray';
import injectTapEventPlugin from 'react-tap-event-plugin';
import webSocketsClient from './utils/webSocketsClient'

// login & username selection
// import setUsername from '.utils/setUsername';

let lsUsername = localStorage.getItem("username") || null;
let username = '';
// const lsUsernameID = localStorage.getItem("usernameID") || null;
// let usernameID = '';

const getConversations = (user, store) => {
  usersRef.child(user + "/conversations").once('value', snapshot => {

    // if DB is not empty
    if(snapshot.val() !== null) {
      console.log("Welcome back, " + username);
      var conversationsObj = snapshot.val();
      var usersList = [];

      const messages = Object.keys(conversationsObj).map(function(user, i) {
        const messageArray = [];
        usersList.push(user);
        database.child('conversations/' + conversationsObj[user]).once('value', snapshot => {
          const messageArray = objToArray(snapshot.val());
          store.dispatch(startFetchMessages({ id: user, data: messageArray }));
        })
      })
      const filteredArr = usersList.filter((user) => user !== username && user !== 'admin-bot');
      store.dispatch(addUserList(filteredArr))

    } else {
      // Start again
      setUsername(store)
    }
  })

  // Add current user to store
  store.dispatch(addCurrentUser(username));
}

// TODO: Refactor
// NEW USERS
const setUsername = (store) => {

  username = nameGen();
  localStorage.setItem("username", username);

  const initMessage = {
    username: 'admin-bot',
    sender: 'admin-bot',
    text: 'Welcome to bestChat v2!',
    createdAt: Date.now(),
    roomId: 'admin-bot'
  };

  const initMessage2 = {
    username: 'random-user',
    sender: 'random-user',
    text: 'Weeeeeeeeee!',
    createdAt: Date.now(),
    roomId: 'random-user'
  };

  // var postData = {
  //   author: username,
  //   uid: uid,
  //   body: body,
  //   title: title,
  //   starCount: 0,
  //   authorPic: picture
  // };

  // conversation memebers
  const conversationMembers = {}
  conversationMembers[username] = true;
  conversationMembers['admin-bot'] = true;

  // Conversation 1
  const newPostKey = database.child('conversations').push().key;
  usersRef.child(username + '/conversations').update({'admin-bot': newPostKey});
  conversationsRef.child(newPostKey).push(initMessage);

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'admin-bot', data: [initMessage] }));

  // Conversation 2 (TEMP)
  const newPostKey2 = database.child('conversations').push().key;
  usersRef.child(username + '/conversations').update({'random-user': newPostKey2});
  conversationsRef.child(newPostKey2).push(initMessage2);

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'random-user', data: [initMessage2] }));

  console.log(`Welcome, ${username}!`);
}

const init = (store) => {
  // check if username(uuid?) is saved in localStorage
  if(lsUsername) {
    console.log("#1")
    username = lsUsername;
    getConversations(lsUsername, store);
  } else {
    console.log("#2")
    // New User
    setUsername(store)
    getConversations(username, store);
  }

  // maybe could move this somehwhere, no need to call this again? maybe after fetch messages?
  // Store list of users minus current user
  // usersRef.once('value', snapshot => {
  //   console.log("ADD USER LIST: ************** ", snapshot.val())
  //   const usersList = objKeysToArray(snapshot.val());
  //   const filteredArr = usersList.filter((user) => user !== username);
  //   store.dispatch(addUserList(filteredArr))
  // })

  // Watch for db changes: new users
  // usersRef.on("child_added", function(snapshot, prevChildKey) {
  //   console.log("CHILD added: ", snapshot.val(), prevChildKey)
  //   // if(prevChildKey) {
  //   //   store.dispatch(addUserToList(prevChildKey))
  //   // }
  // });

  // For activeUsers: set up Presence
  // listens for changes
  firebase.database().ref(".info/connected").on('value', snapshot => {
    if (snapshot.val()) {
      var ref = connectedRef.child(username);
      ref.onDisconnect().set(false);
      console.log("CONNECTED USERS: ", snapshot.val())
    }
  });

  connectedRef.on("value", function(snapshot) {
    var connected = snapshot.val();
    if(connected) {
      console.log("User connected: ",  connected);
      var userObj = {}
      userObj[username] = true;
      connectedRef.update(userObj);
    } else {
      console.log("User disconnected: ", connected);
      var userObj = {}
      userObj[username] = false;
      connectedRef.update(userObj);
    }
  });

  // Last Connect
  // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
  // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

  // ===================== RESET USER ======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });
  // connectedRef.on("value", function(snapshot) {}) <---- REMOVE REFERENCE IN ONLINE USERS,
  // keep ONLINE_USERS and users list in sync

  injectTapEventPlugin();

  // Could probably replace this with firebase.
  webSocketsClient(username, store)
}

export default init;
