import {usersRef, conversationsRef} from './../../../firebase';
import {addMessageToStore, updateUserTable} from './../../../actions/index';

export const SendMessage = (currentUser, message, dispatch) => {

  usersRef.child(currentUser + '/conversations/' + message.roomId).once('value', snapshot => {
    // here we check if message exists.
    const listed = snapshot.val();

    // If a reference exists in currentUser/conversations/:id, send the message there.
    if(!!listed || message.roomName == 'admin-bot') {      
      dispatch(addMessageToStore(message));
      conversationsRef.child(message.roomId).push(message);
    } else {

      // No reference exists, so one needs to be created.
      const cRef = usersRef.child(currentUser + '/conversations/' + message.roomId).push().key;
      message.roomId = cRef;
      
      // Push message to store
      dispatch(addMessageToStore(message));

      // Update userTable with -> { ID: NAME }
      var userTableObj = {
          id: cRef,
          name: message.roomName
      };

      // Update store
      dispatch(updateUserTable(userTableObj));

      // Push message to db
      conversationsRef.child(cRef).push(message)

      // Add a reference to this conversation for both users
      usersRef.child(currentUser + '/conversations/' + cRef).set(message.roomName);
      usersRef.child(message.roomName + '/conversations/' + cRef).set(currentUser);
    }
  })
}

export default SendMessage;