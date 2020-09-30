import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBarcEm15ekt9ZtaaSbTqvt2o_Iazwpra4",
  authDomain: "kpop-trade.firebaseapp.com",
  databaseURL: "https://kpop-trade.firebaseio.com",
  projectId: "kpop-trade",
  storageBucket: "kpop-trade.appspot.com",
  messagingSenderId: "739240915797",
  appId: "1:739240915797:web:2ce7e3960bbdf7f8dc35dc",
  measurementId: "G-D68V9LGJ09"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;


  