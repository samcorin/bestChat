import firebase, {usersRef, conversationsRef, database} from './firebase/index';
import {startFetchMessages, addCurrentUser, updateUserList, updateUserTable, addMessageToStore} from './actions/index';
import nameGen from './utils/nameGen'
import {objKeysToArray, objToArray} from './utils/objFunctions';
import userStatus from './utils/connectState';
import {objSwap} from './utils/objFunctions';
import injectTapEventPlugin  from 'react-tap-event-plugin';

// login & username selection

let lsUsername = localStorage.getItem("username") || null;
let currentUser = '';
// const lsUsernameID = localStorage.getItem("usernameID") || null;
// let usernameID = '';

const getConversations = (user, store) => {
  
  // // Use ID
  // const userKey = usersRef.push().key;

  
  // // conversationsRef.child(newPostKey).push(message);
  
  // usersRef.child(userKey).update({username: 'billy'})
  // console.log('REF: ', userKey)

  // ----------------------------------------------------------- TEST

  usersRef.child(user + "/conversations").once('value', snapshot => {

    // Check if DB is not empty. If it is, it deletes the user
    if(snapshot.val() !== null) {
      const conversationsObj = snapshot.val();

      // Iterates through roomIds using data from users/conversations,
      Object.keys(conversationsObj).map(function(roomId, i) {

        return database.child('conversations/' + roomId).once('value', snapshot => {
          let obj = snapshot.val();

          if(obj.meta) {
            delete obj.meta;
          }
          // remove obj.key == x
          const messageArray = objToArray(obj);
          store.dispatch(startFetchMessages({ id: conversationsObj[roomId], data: messageArray }));
        })
      })
      
      // Call listener
      // listener(store);
    
    } else {
      // Start fresh
      setUsername(store)
    }
  })

  // Add current user to store
  store.dispatch(addCurrentUser(currentUser));
}

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
  
  // Listen for changes
  // listener(store);
  store.dispatch(addCurrentUser(currentUser));
}

const init = (store) => {
  
  // username found in localStorage?
  if(lsUsername) {
    currentUser = lsUsername;
    getConversations(lsUsername, store);
  } else {
    // New User
    setUsername(store)
  }

  // ======================= activeUsers =========================
  userStatus(currentUser, store);

  // const listener = (store) => {
    // Listeners
    
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
          if(newMessage.roomName === currentUser) {
            newMessage.roomName = tempUserObj.name;
            store.dispatch(addMessageToStore(newMessage));
          }

        })
      })
    });

    // ======================= USER TABLE =========================
    // usersRef.child(currentUser).on('value', snapshot => {
    //   const meta = snapshot.val()
    //   console.log("META: ", meta)
    // })


    // ===================== LAST CONNECT ======================
    // var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
    // userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  // }


  // ====================== RESET USER =======================
  // database.ref('users/' + userId).set({
  //   username: username
  // });
  injectTapEventPlugin();
}

export default init;
