import {usersRef, conversationsRef, database} from './firebase/index';
import {startFetchMessages, addCurrentUser, updateUserList, updateUserTable, addMessageToStore} from './actions/index';
import nameGen from './utils/nameGen'
import {objKeysToArray, objToArray} from './utils/objFunctions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import userStatus from './utils/connectState';
import {objSwap} from './utils/objFunctions';

// login & username selection

let lsUsername = localStorage.getItem("username") || null;
let currentUser = '';
// const lsUsernameID = localStorage.getItem("usernameID") || null;
// let usernameID = '';

const getConversations = (user, store) => {
  usersRef.child(user + "/conversations").once('value', snapshot => {

    // Check if DB is not empty. If it is, it deletes the user
    if(snapshot.val() !== null) {
      const conversationsObj = snapshot.val();

      // Iterates through roomIds using data from users/conversations,
      Object.keys(conversationsObj).map(function(roomId, i) {

        return database.child('conversations/' + roomId).once('value', snapshot => {
          const messageArray = objToArray(snapshot.val());
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

  // ?>Need to separate this. initDatabase or something..

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
  // Check if username(uuid?) is saved in localStorage ( && database !== null)
  if(lsUsername) {
    currentUser = lsUsername;
    // SET LISTENERS + fetch etc...
    getConversations(lsUsername, store);
  } else {
    // New User
    setUsername(store)
    // SET LISTENERS + fetch etc...
    // getConversations(currentUser, store);
  }


  // LISTENERS ===================================================

  // ======================= activeUsers =========================
  userStatus(currentUser, store);

  // ======================== userList ===========================
  usersRef.on('value', snapshot => {
    const users = objKeysToArray(snapshot.val()).filter((user) => user !== currentUser);
    store.dispatch(updateUserList(users))
  });

  // ======================= USER TABLE ==========================
  usersRef.child(currentUser + '/conversations').on('child_added', snapshot => {
    const addedUser = snapshot.val();
    usersRef.child(currentUser + '/conversations').once('value', snapshot => {

      const tempUserTable = objSwap(snapshot.val())
      const tempUserObj = {id: tempUserTable[addedUser], name: addedUser};
      store.dispatch(updateUserTable(tempUserObj));

      // -------------- CONVERSATION LISTENER ------------------
      conversationsRef.child(tempUserTable[addedUser]).on('child_added', snapshot => {
        const newMessage = snapshot.val();

        // currentUser stores the message in Conversation.js
        // this just listens for incoming messages
        if(newMessage.roomName === currentUser) {
          newMessage.roomName = tempUserObj.name;
          store.dispatch(addMessageToStore(newMessage));
        }

      })
    })
  });

  // ===================== LAST CONNECT ======================
  // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
  // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

  // ====================== RESET USER =======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });

  injectTapEventPlugin();
}

export default init;
