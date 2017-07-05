import firebase from 'firebase/app';
require('firebase/database');

try {
  var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
} catch (e) {

}

// Export firebase references
// Trim doen on these ??
export const usersRef = firebase.database().ref('users');
export const conversationsRef = firebase.database().ref('conversations');
export const database = firebase.database().ref();
export const connectedRef = firebase.database().ref('ONLINE_USERS');
export default firebase;
