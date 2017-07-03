import firebase, {usersRef, conversationsRef, database, connectedRef} from './firebase/index';
import {startFetchMessages, addCurrentUser, addUserList, addUserToList, addActiveUsers} from './actions/index';
import nameGen from './utils/nameGen'
import {objKeysToArray, objToArray} from './utils/objToArray';
import injectTapEventPlugin from 'react-tap-event-plugin';
import webSocketsClient from './utils/webSocketsClient'

// login & username selection
// import setUsername from '.utils/setUsername';

let lsUsername = localStorage.getItem("username") || null;
let currentUser = '';
var activeUsers = [];
// const lsUsernameID = localStorage.getItem("usernameID") || null;
// let usernameID = '';

const getConversations = (user, store) => {
  usersRef.child(user + "/conversations").once('value', snapshot => {

    // if DB is not empty
    if(snapshot.val() !== null) {
      console.log("Welcome back, " + currentUser);
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

      // =========== FETCH USERLIST ===========
      // Abstract function?
      // const filteredArr = usersList.filter((user) => user !== currentUser && user !== 'admin-bot');
      // // USER LIST is only fetching users from my message history
      // console.log("filteredArr: ", filteredArr)
      // store.dispatch(addUserList(filteredArr))

    } else {
      // Start again
      setUsername(store)
    }
  })

  // Add current user to store
  store.dispatch(addCurrentUser(currentUser));
}

// TODO: Refactor
// NEW USERS
const setUsername = (store) => {

  currentUser = nameGen();
  localStorage.setItem("username", currentUser);

  const initMessage = {
    username: 'admin-bot',
    sender: 'admin-bot',
    text: 'Welcome to bestChat v2!',
    createdAt: Date.now(),
    roomId: 'admin-bot'
  };

  const initMessage4 = {
    username: 'admin-bot',
    sender: 'admin-bot',
    text: 'hellooo!',
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
  conversationMembers[currentUser] = true;
  conversationMembers['admin-bot'] = true;

  // Conversation 1
  const newPostKey = database.child('conversations').push().key;
  usersRef.child(currentUser + '/conversations').update({'admin-bot': newPostKey});
  conversationsRef.child(newPostKey).push(initMessage);
  conversationsRef.child(newPostKey).push(initMessage4);

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'admin-bot', data: [initMessage] }));
  store.dispatch(startFetchMessages({ id: 'admin-bot', data: [initMessage4] }));

  // Conversation 2 (TEMP)
  const newPostKey2 = database.child('conversations').push().key;
  usersRef.child(currentUser + '/conversations').update({'random-user': newPostKey2});
  conversationsRef.child(newPostKey2).push(initMessage2);

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'random-user', data: [initMessage2] }));

  console.log(`Welcome, ${currentUser}!`);
}

const init = (store) => {
  // check if username(uuid?) is saved in localStorage
  if(lsUsername) {
    currentUser = lsUsername;
    getConversations(lsUsername, store);
  } else {
    // New User
    setUsername(store)
    getConversations(currentUser, store);
  }

  // For activeUsers: set up Presence
  // listens for changes
  firebase.database().ref(".info/connected").on('value', snapshot => {
    if (snapshot.val()) {
      var ref = connectedRef.child(currentUser);
      ref.set(true);
      // ref.onDisconnect().set(false);
      ref.onDisconnect().remove();
      console.log("CONNECTED USERS: ", snapshot.val())
    }
  });

  // Update Active users
  connectedRef.on("value", function(snapshot) {
    var connected = snapshot.val();
    activeUsers = objKeysToArray(connected);

    activeUsers.splice(activeUsers.indexOf(currentUser), 1);
    console.log("*****activeUsers SPLICED: ", activeUsers)
    store.dispatch(addActiveUsers(activeUsers));

  });

  // ========= USER LIST ===========
  usersRef.once('value', snapshot => {
    const filteredArr = objKeysToArray(snapshot.val()).filter((user) => user !== currentUser);
    console.log("filteredArr: ", filteredArr)
    store.dispatch(addUserList(filteredArr))
  });

  // connectedRef.once('value', snapshot => {
  //   console.log("ACTIVE USER LIST: ", snapshot.val());
  // })

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
  webSocketsClient(currentUser, store)
}

export default init;
