import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAy0x8HvMFIK8WLcje6qN1a9NqdTGBXW2U",
  authDomain: "cricket-57e5e.firebaseapp.com",
  projectId: "cricket-57e5e",
  storageBucket: "cricket-57e5e.appspot.com",
  messagingSenderId: "424889122029",
  appId: "1:424889122029:web:2174c61434dd0a7e2a20e4"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
