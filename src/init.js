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
    console.log("-------------------- GET CONV -------------------------")
    console.log(snapshot.val())
    // should add these to store
    //
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
    } else {
      // Start fresh
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

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'admin-bot', data: [initMessage] }));

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

  // For activeUsers: Add and remove users from "ONLINE_USERS"
  firebase.database().ref(".info/connected").on('value', snapshot => {
    if (snapshot.val()) {
      var ref = connectedRef.child(currentUser);
      ref.set(true);
      ref.onDisconnect().remove();
      console.log("CONNECTED USERS: ", snapshot.val())
    }
  });

  // Update Active users
  connectedRef.on("value", function(snapshot) {
    var connected = snapshot.val();
    activeUsers = objKeysToArray(connected);
    activeUsers.splice(activeUsers.indexOf(currentUser), 1);
    store.dispatch(addActiveUsers(activeUsers));

  });

  // ========= USER LIST =========== Fetch user list and listen for new users
  usersRef.on('value', snapshot => {
    const filteredArr = objKeysToArray(snapshot.val()).filter((user) => user !== currentUser);
    store.dispatch(addUserList(filteredArr))
  });


  // Maybe this is for new conversations only
  // ========= CONVESTATIONS LIST =========== Fetch user conversations and listen for new ones created
  usersRef.child(currentUser + '/conversations').on('value', snapshot => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%% : ", snapshot.val())
    // returns each conversation with matching ID
    // store....
  });



  // Last Connect
  // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
  // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

  // ===================== RESET USER ======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });

  injectTapEventPlugin();

  // Could probably replace this with firebase.
  webSocketsClient(currentUser, store)
}

export default init;
