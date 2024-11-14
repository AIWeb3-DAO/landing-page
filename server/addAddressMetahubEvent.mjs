// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import path from "path";

import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";

// Load environment variables from .env file
//dotenv.config();
// Load environment variables from the .env file in the "server" directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

/**
 * Add wallet address and video ID to the "metahubEvents" collection in Firestore
 * @param {string} walletAddress - The user's wallet address
 * @param {string} videoId - The ID of the video associated with the event
 */
const addAddressMetahubEvent = async (walletAddress, videoId) => {
  if (!walletAddress || !videoId) {
    console.error("Wallet address and video ID are required.");
    return;
  }

  try {
    // Reference the "metahubEvents" collection
    const docRef = await addDoc(collection(db, "metahubEvents"), {
      walletAddress,
      videoId,
      createdAt: serverTimestamp(),
    });

    console.log(`Document added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding document to metahubEvents:", error);
  }
};

// Example usage
const walletAddress = process.argv[2];
const videoId = process.argv[3];

if (!walletAddress || !videoId) {
  console.error("Usage: node addAddressMetahubEvent.mjs <walletAddress> <videoId>");
  process.exit(1);
}

await addAddressMetahubEvent(walletAddress, videoId);

process.exit();
