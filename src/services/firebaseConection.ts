import firebase from "firebase/app";
import 'firebase/firestore'


let firebaseConfig = {
  apiKey: "AIzaSyDNOWtEy9MLpIqMvQyS7DWOANvdsh_YqAQ",
  authDomain: "boardingapp-56570.firebaseapp.com",
  projectId: "boardingapp-56570",
  storageBucket: "boardingapp-56570.appspot.com",
  messagingSenderId: "1048544055162",
  appId: "1:1048544055162:web:c3e5580f8acabc5aab10c3",
  measurementId: "G-03N7C92MYM"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;



