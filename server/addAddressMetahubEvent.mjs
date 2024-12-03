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
 * @param {string} questId - The ID of the quest
 * @param {string} taskId - The ID of the task
 */
const addAddressMetahubEvent = async (walletAddress, videoId, questId, taskId) => {
  if (!walletAddress || !videoId || !questId || !taskId) {
    console.error("Wallet address and video ID, quest ID, and task ID are required.");
    return;
  }

  try {
    // Convert the walletAddress to lowercase for a case-insensitive comparison
    const lowerCaseWalletAddress = walletAddress.toLowerCase();
    // Reference the "metahubEvents" collection
    const docRef = await addDoc(collection(db, "metahubEvents"), {
      lowerCaseWalletAddress,
      videoId,
      questId,
      taskId,
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
const questId = process.argv[4];
const taskId = process.argv[5];

if (!walletAddress || !videoId || !questId || !taskId) {
  console.error("Usage: node addAddressMetahubEvent.mjs <walletAddress> <videoId> <questId> <taskId>");
  process.exit(1);
}

// Call the function
await addAddressMetahubEvent(walletAddress, videoId, questId, taskId);

process.exit();
