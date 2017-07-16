import {usersRef, conversationsRef} from './../../../firebase';
import {addMessageToStore, updateUserTable} from './../../../actions/index';

export const SendMessage = (currentUser, message, roomName, roomId, dispatch) => {
  
  // check if room is new
  console.log("CHECK: ", currentUser, message, roomName, roomId, dispatch);
  usersRef.child(currentUser + '/conversations/' + roomName).once('value', snapshot => {

    const listed = snapshot.val();
    
    console.log("snap: ", listed);
    console.log("SENDDDD: ", currentUser, message, roomId, roomName );
    
    // If a reference exists in currentUser/conversations/:id, send the message there.
    if(!!listed) {
      message.roomId = roomId;

      // add username..
      message.roomName = roomName;
      dispatch(addMessageToStore(message));
      conversationsRef.child(message.roomId).push(message);
    } else {

      // No reference exists, so one needs to be created.
      const cRef = usersRef.child(currentUser + '/conversations/' + roomName).push().key;
      message.roomId = cRef;

      // Push message to store
      message.roomName = roomName;
      dispatch(addMessageToStore(message));

      // Update userTable with -> { ID: NAME }
      var userTableObj = {
          id: cRef,
          name: roomName
      };

      // Update store
      dispatch(updateUserTable(userTableObj));

      // Push message to db
      conversationsRef.child(cRef).push(message)

      // Add a reference to this conversation for both users
      usersRef.child(currentUser + '/conversations/' + cRef).set(roomName);
      usersRef.child(roomName + '/conversations/' + cRef).set(currentUser);
    }
  })
}

export default SendMessage;