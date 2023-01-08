import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBRUuY2sp2oWXO_BvGWZarK_BU3w9uDufQ",
  authDomain: "whatsapp-57ee9.firebaseapp.com",
  projectId: "whatsapp-57ee9",
  storageBucket: "whatsapp-57ee9.appspot.com",
  messagingSenderId: "169472754033",
  appId: "1:169472754033:web:7addc8a319c148cdff36d0",
  measurementId: "G-91W635DGC7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
