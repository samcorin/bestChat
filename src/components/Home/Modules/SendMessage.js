import {addMessageToStore, updateUserTable} from './../../../actions/index';

export const SendMessage = (currentUser, message, swapped, room, usersRef, conversationsRef, thatProps) => {
  usersRef.child(currentUser + '/conversations/' + swapped[room]).once('value', snapshot => {
    const roomName = snapshot.val();

    // If a reference exists in currentUser/conversations/:id, send the message there.
    if(roomName) {
      message.roomId = swapped[roomName];

      // add username..
      message.roomName = roomName;
      thatProps.dispatch(addMessageToStore(message));
      conversationsRef.child(message.roomId).push(message);
    } else {

      // No reference exists, so one needs to be created.
      const cRef = usersRef.child(currentUser + '/conversations/' + room).push().key;
      message.roomId = cRef;

      // Push message to store
      message.roomName = room;
      thatProps.dispatch(addMessageToStore(message));

      // Update userTable with -> { ID: NAME }
      var userTableObj = {
          id: cRef,
          name: room
      };

      thatProps.dispatch(updateUserTable(userTableObj));

      // Push message to db
      conversationsRef.child(cRef).push(message)

      // Add a reference to this conversation for both users
      usersRef.child(currentUser + '/conversations/' + cRef).set(room);
      usersRef.child(room + '/conversations/' + cRef).set(currentUser);
    }
  })
}

export default SendMessage;