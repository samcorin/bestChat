import {addMessageToStore, updateUserTable} from './../../../actions/index';

export const NewRoomMessage = (currentUser, room, usersRef, conversationsRef, thatProps) => {
  let message = {
    sender: currentUser,
    text: '',
    createdAt: Date.now(),
    type: 'miit'
  }

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

export default NewRoomMessage;