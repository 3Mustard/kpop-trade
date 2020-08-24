import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBl8oFPZTMqKGBbmiJ_UYv3aWl4ODvXaLM",
    authDomain: "lets-trade-a1486.firebaseapp.com",
    databaseURL: "https://lets-trade-a1486.firebaseio.com",
    projectId: "lets-trade-a1486",
    storageBucket: "lets-trade-a1486.appspot.com",
    messagingSenderId: "784436598416",
    appId: "1:784436598416:web:e3fdd8a0319bea7c5b2a15",
    measurementId: "G-K1360B4FB0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
