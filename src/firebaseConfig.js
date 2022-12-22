// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6bcdqS-Ytdq9fFj0vmMkfcft7Un13MHM",
  authDomain: "chilachilli.firebaseapp.com",
  databaseURL: "https://chilachilli-default-rtdb.firebaseio.com",
  projectId: "chilachilli",
  storageBucket: "chilachilli.appspot.com",
  messagingSenderId: "651700807094",
  appId: "1:651700807094:web:0d4b6d0cfbf11da1500d17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;