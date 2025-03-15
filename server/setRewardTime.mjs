// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, serverTimestamp , getFirestore } from "firebase/firestore";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatBalance } from "@polkadot/util";


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

async function setRewardTime(minutes) {
  try {
    // Validate input
    const minutesInt = parseInt(minutes, 10);
    if (isNaN(minutesInt) || minutesInt <= 0) {
      throw new Error("Please provide a valid number of minutes greater than 0");
    }

    // Fetch the current timestamp from keyINFO/time
    const docRef = doc(db, "keyINFO", "time");
    const docSnap = await getDoc(docRef);

    let currentTimestamp;
    if (docSnap.exists() && docSnap.data().timestamp) {
      currentTimestamp = docSnap.data().timestamp.toMillis
        ? docSnap.data().timestamp.toMillis() // If stored as Firebase Timestamp
        : docSnap.data().timestamp; // If stored as milliseconds
    } else {
      console.warn("Timestamp not found in keyINFO/time, using current local time as fallback");
      currentTimestamp = Date.now();
    }

    // Calculate rewardTime as timestamp + minutes
    const rewardInterval = minutesInt * 60 * 1000; // Convert minutes to milliseconds
    const rewardTime = currentTimestamp + rewardInterval;

    // Update only rewardTime in Firebase
    const data = {
      rewardTime: rewardTime, // Set as milliseconds
    };

    await setDoc(docRef, data, { merge: true });

    const rewardDate = new Date(rewardTime);
    console.log(`RewardTime updated successfully!`);
    console.log(`- Based on current timestamp: ${new Date(currentTimestamp).toISOString()}`);
    console.log(`- Reward time set to: ${rewardDate.toISOString()} (in ${minutesInt} minutes)`);
  } catch (error) {
    console.error("Error setting reward time:", error.message);
    process.exit(1);
  }
}

// Get minutes from command line argument
const minutes = process.argv[2];
if (!minutes) {
  console.error("Usage: node setRewardTime.mjs <minutes>");
  console.error("Example: node setRewardTime.mjs 60");
  process.exit(1);
}

// Run the function
setRewardTime(minutes).then(() => process.exit(0));
