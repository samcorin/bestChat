import firebase, {usersRef, conversationsRef, database} from './firebase/index';
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
      var conversationsObj = snapshot.val();

      const messages = Object.keys(conversationsObj).map(function(user, i) {
        const messageArray = [];
        database.child('conversations/' + conversationsObj[user]).once('value', snapshot => {
          const messageArray = objToArray(snapshot.val());
          store.dispatch(startFetchMessages({ id: user, data: messageArray }));
        })
      })

    } else {
      // DB is empty, need to start again.
      setUsername()
      // ??
      // store.dispatch(startFetchMessages(snapshot.val()));
    }
  })

  // Add current user to store
  store.dispatch(addCurrentUser(username));
}

// TODO: Refactor
const setUsername = () => {
  username = nameGen();
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

  const initMessage3 = {
    username: 'random-user',
    sender: 'random-user',
    text: 'last!',
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

  // Conversation 2
  const newPostKey2 = database.child('conversations').push().key;
  usersRef.child(username + '/conversations').update({'random-user': newPostKey2});
  conversationsRef.child(newPostKey2).push(initMessage2);
  conversationsRef.child(newPostKey2).push(initMessage3);

  localStorage.setItem("username", username);
}

const init = (store) => {
  // check if username(uuid?) is saved in localStorage
  if(lsUsername) {
    username = lsUsername;
    console.log("Welcome back, " + lsUsername);
    getConversations(username, store);

  } else {
    // New User
    setUsername()
    console.log(`Welcome, ${username}!`);
    getConversations(username, store);
    store.dispatch(addCurrentUser(username))
  }

  // Store list of users minus current user
  usersRef.once('value', snapshot => {
    const usersList = objKeysToArray(snapshot.val());
    const filteredArr = usersList.filter((user) => user !== username);
    store.dispatch(addUserList(filteredArr))
  })

  // Watch for db changes: new users
  // usersRef.on("child_added", function(snapshot, prevChildKey) {
  //   console.log("CHILD added: ", snapshot.val(), prevChildKey)
  //   // if(prevChildKey) {
  //   //   store.dispatch(addUserToList(prevChildKey))
  //   // }
  // });

  // For activeUsers:
  // Check connection state
  // var connectedRef = firebase.database().ref(".info/connected");
  // connectedRef.on("value", function(snap) {
  //   if (snap.val() === true) {
  //     // store.dispatch(connectionState(true))
  //     // set state connected: true/false
  //     console.log("connected");
  //   } else {
  //     // store.dispatch(connectionState(false))
  //     // set state connected: true/false
  //     console.log("not connected");
  //   }
  // });

  // Last Connect
  // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
  // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

  // ===================== RESET USER ======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });

  injectTapEventPlugin();

  // Could probably replace this with firebase.
  webSocketsClient(username, store)
}

export default init;
