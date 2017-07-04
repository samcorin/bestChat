import firebase, {usersRef, conversationsRef, database, connectedRef} from './firebase/index';
import {startFetchMessages, addCurrentUser, addUserList, addUserToList, addActiveUsers, updateUserTable} from './actions/index';
import nameGen from './utils/nameGen'
import {objKeysToArray, objToArray} from './utils/objFunctions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import trace from './utils/trace';
// import getConversations from './utils/getConversations';

// login & username selection
// import setUsername from '.utils/setUsername';

let lsUsername = localStorage.getItem("username") || null;
let currentUser = '';
var activeUsers = [];
// const lsUsernameID = localStorage.getItem("usernameID") || null;
// let usernameID = '';

// This already handles fetching the conversations, so I could just run this on event fire?
const getConversations = (user, store) => {
  usersRef.child(user + "/conversations").once('value', snapshot => {
    // if DB is not empty, if it is, it deltes the user
    if(snapshot.val() !== null) {
      const conversationsObj = snapshot.val();
      store.dispatch(updateUserTable(conversationsObj));
      // Create a hash list, add to store
      // var usersList = [];

      // usersRef.child(currentUser + '/conversations').on('child_added', snapshot => {
      //     // child+added, add that one, dont dp extraneous stuff
      //     console.log("---------------------------------------------------------")
      //     const newMessagesObj = snapshot.val();
      //     console.log("NEW MESSAGES: ", newMessagesObj)
      //     // const filteredNewMessages = newMessages.filter(user => user !== currentUser && user !== 'admin-bot');
      //     // console.log("Filtered messages: ", filteredNewMessages)
      //     console.log("--------------------------- END -------------------------")
        // })

      // Iterates through roomIds using data from users/conversations,
      Object.keys(conversationsObj).map(function(roomId, i) {
        const messageArray = [];
        // should I store the hash in store?

        database.child('conversations/' + roomId).once('value', snapshot => {
          const messageArray = objToArray(snapshot.val());
          // INEFFICIENT: needs to just add one, not repeat all the time, too many conversations
          store.dispatch(startFetchMessages({ id: conversationsObj[roomId], data: messageArray }));
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

  const message = {
    sender: 'admin-bot',
    text: `Welcome to bestChat, ${currentUser}!`,
    createdAt: Date.now()
  };

  // Conversation 1
  const newPostKey = database.child('conversations').push().key;

  // Ensure an { ID: NAME } pairing
  const newPostObj = {};
  newPostObj[newPostKey] = 'admin-bot';

  usersRef.child(currentUser + '/conversations').update(newPostObj);
  message.roomId = newPostKey;
  conversationsRef.child(newPostKey).push(message);

  // Add directly to store, skip fetching uselessly from db
  store.dispatch(startFetchMessages({ id: 'admin-bot', data: [message] }));

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
    // NEW USER ADDED
    const filteredArr = objKeysToArray(snapshot.val()).filter((user) => user !== currentUser);
    store.dispatch(addUserList(filteredArr))
  });


  // Maybe this is for new conversations only
  // ========= CONVESTATIONS LIST =========== Fetch user conversations and listen for new ones created
  usersRef.child(currentUser).on('child_changed', snapshot => {
    // New conversation initiated
    const conversationsObj = snapshot.val();
    // Update userTable with new user key:value pair
    store.dispatch(updateUserTable(conversationsObj));
  });


    // usersRef.child(currentUser + '/conversations/' + snapshot.val()).once('value', snapshot => {
    //   console.log("CONVERSATION CHILD CHANGED ++++++++: ", snapshot.val())
    // })

    // HERE
  //   // child+added, add that one, dont dp extraneous stuff
  //   console.log("New Messages Obj : ", snapshot.val())
  //   const newMessagesObj = snapshot.val();
  //   const newMessages = objKeysToArray(newMessagesObj);
  //   const filteredNewMessages = newMessages.filter(user => user !== currentUser && user !== 'admin-bot');
  //   // console.log(":::::::::::", filteredNewMessages);
  //   // returns an obj of all my conversations + new



  // Last Connect
  // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
  // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

  // ===================== RESET USER ======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });

  injectTapEventPlugin();
}

export default init;
