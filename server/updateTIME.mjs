
// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, addDoc, getDocs, doc, setDoc, serverTimestamp , getFirestore } from "firebase/firestore";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

//console.log("now printing the api : ", firebaseConfig.apiKey)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const updateTimestamp = async () => {
  try {
    const data = { timestamp: serverTimestamp() };
    //console.log('Updating document with data:', data);
    const docRef = doc(db, "keyINFO", "time");
    await setDoc(docRef, data, { merge: true });
    console.log("Timestamp updated");
  } catch (error) {
    console.error("Error updating timestamp:", error);
  }
};



// Update the timestamp every 10 seconds
setInterval(updateTimestamp, 10000);
