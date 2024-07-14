// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs , getFirestore } from "firebase/firestore";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// const querySnapshot4 = await getDocs(collection(db, "youtube"));
// querySnapshot4.forEach((doc) => {
//   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
// });

export { db };