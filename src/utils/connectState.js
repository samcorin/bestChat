import firebase, {connectedRef} from './../firebase/index';
import {objKeysToArray} from './objFunctions';
import {addActiveUsers} from './../actions/index';

const userStatus = (username, store) => {
  let activeUsers = [];

  firebase.database().ref('.info/connected').on('value', snapshot => {
    if (snapshot.val()) {
      let ref = connectedRef.child(username);
      ref.set(true);
      ref.onDisconnect().remove();
    }
  });

  // Needs perf improvements, eg: child_added/child_removed, 2 separate functions
  // Add and remove users from "ONLINE_USERS"
  connectedRef.on('value', snapshot => {
    let connected = snapshot.val();
    activeUsers = objKeysToArray(connected);
    activeUsers.splice(activeUsers.indexOf(username), 1);
    store.dispatch(addActiveUsers(activeUsers));
  });
}

export default userStatus;
