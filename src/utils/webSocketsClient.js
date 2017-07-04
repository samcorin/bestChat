// import {addActiveUsers, addMessageToStore, addUserToList} from './../actions/index';
// import {usersRef} from './../firebase/index';
// import store from './../store';

// // export const socket = new WebSocket('ws://127.0.0.1:1337');
// var HOST = window.location.origin.replace(/^http/, 'ws')
// // export const socket = new WebSocket(HOST);
// export const socket = new WebSocket(HOST);

// let activeUsers = [];

// const webSocketsClient = (currentUser, store) => {
//   socket.onopen = () => {
//     socket.send(JSON.stringify({
//       type: 'connect',
//       username: currentUser
//     }));
//   }

//   socket.onmessage = function (message) {
//     let data = JSON.parse(message.data)

//     switch(data.type) {
//       case 'message':
//         // GETTING A MESSSAGE, so add it to store and db
//         console.log("RECEIVER: message: ", data)
//         // client received message.
//         if(data.message.roomId === currentUser) {
//           data.message.roomId = data.message.sender;
//           store.dispatch(addMessageToStore(data.message));
//           usersRef.child(currentUser + '/conversations/' + data.message.sender).push(data.message);
//         }
//         break;
//       case 'activeUsers':
//         // update activeUsers list
//         activeUsers = data.activeUsers;
//         activeUsers.splice(activeUsers.indexOf(currentUser), 1);
//         console.log("*****activeUsers: ", activeUsers)
//         store.dispatch(addActiveUsers(activeUsers));
//         // if(activeUsers.length === 1) {
//         // } else {
//         //   store.dispatch(addActiveUsers(activeUsers));
//         // }
//         break;
//       default:
//         break;
//     }
//   }
// }

// export default webSocketsClient;
