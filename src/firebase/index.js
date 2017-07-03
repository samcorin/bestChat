import firebase from 'firebase/app';
require('firebase/database');

// Defer loading:
// await componentDidMount() {
//  const auth = await require('firebase/auth');
//  ....
// } ?????
// export const googleLogin  = new firebase.auth.GoogleAuthProvider();

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: "https://bestchat-81de1.firebaseio.com",
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
} catch (e) {
}

// export const firebaseRef = firebase.database().ref();
export const usersRef = firebase.database().ref('users');
export const conversationsRef = firebase.database().ref('conversations');
export const database = firebase.database().ref();
export default firebase;
