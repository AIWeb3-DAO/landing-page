
// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, addDoc,getDoc,updateDoc, getDocs, doc, setDoc, serverTimestamp , getFirestore } from "firebase/firestore";

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Function to update contributors and tokens in Firestore
const updateContributorsAndTokens = async (videoId, newContributors, newTokens) => {
  try {
    const videoDocRef = doc(db, "youtube", videoId);
    const videoDoc = await getDoc(videoDocRef);

    if (!videoDoc.exists()) {
      console.error("Video document does not exist");
      return;
    }

    const data = videoDoc.data();
    const existingContributors = data.contributors || [];
    const existingTokens = data.tokens || [];

    // Calculate the total current tokens
    const totalExistingTokens = existingTokens.reduce((sum, token) => sum + token, 0);

    // Calculate the distribution of 30% of new tokens to existing contributors
    const newTokenDistribution = newTokens.reduce((sum, token) => sum + token, 0) * 0.3;
    const newTokensForExisting = existingTokens.map(token => token + (token / totalExistingTokens) * newTokenDistribution);

    // Calculate 70% of new tokens for new contributors
    const newTokensForNewContributors = newTokens.map(token => token * 0.7);

    // Update the contributors and tokens arrays
    const updatedContributors = [...existingContributors, ...newContributors];
    const updatedTokens = [...newTokensForExisting, ...newTokensForNewContributors];

    // Update the Firestore document
    await updateDoc(videoDocRef, {
      contributors: updatedContributors,
      tokens: updatedTokens
    });

    console.log("Contributors and tokens updated");
  } catch (error) {
    console.error("Error updating contributors and tokens:", error);
  }
};


// Example usage
// const videoId = 'QkNWBcHxfHqM6ykZ6X7w'; // Replace with your actual video document ID
// const newContributors = ['newContributor100', 'newContributor200']; // Replace with actual new contributors
// const newTokens = [10, 20]; // Replace with actual new token amounts

// await updateContributorsAndTokens(videoId, newContributors, newTokens);

// Retrieve command line arguments
const args = process.argv.slice(2);
const videoId = args[0]; // The first argument is the video document ID
const newContributors = args[1] ? args[1].split(',') : []; // The second argument is the new contributors, comma-separated
const newTokens = args[2] ? args[2].split(',').map(Number) : []; // The third argument is the new token amounts, comma-separated

// Validate input arguments
if (!videoId || newContributors.length === 0 || newTokens.length === 0) {
  console.error("Usage: node script.mjs <videoId> <newContributors> <newTokens>");
  console.error("Example: node script.mjs your-video-id newContributor1,newContributor2 100,200");
  process.exit(1);
}

// Update contributors and tokens
await updateContributorsAndTokens(videoId, newContributors, newTokens);

process.exit();
