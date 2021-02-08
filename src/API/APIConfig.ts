import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAHCWnd_mzCUpMnMq9BMwchoC6xXY0OV_0",
  authDomain: "journey-a9b65.firebaseapp.com",
  projectId: "journey-a9b65",
  storageBucket: "journey-a9b65.appspot.com",
  messagingSenderId: "912817789729",
  appId: "1:912817789729:web:efddc972a13a5dd10ebc60",
  measurementId: "G-74JBN42K00",
};

const fbApp = firebase.initializeApp(firebaseConfig)
export const db = fbApp.firestore()
export const auth = fbApp.auth()