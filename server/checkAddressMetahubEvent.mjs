import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file
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
 * Check if a wallet address exists in the "metahubEvents" collection
 * @param {string} walletAddress - The wallet address to check
 * @returns {Promise<void>} - Resolves if found, rejects if not found
 */
const checkAddressMetahubEvent = async (walletAddress) => {
  if (!walletAddress) {
    console.error("Wallet address is required.");
    process.exit(1);
  }

  try {
    // Query the "metahubEvents" collection for the wallet address
    const q = query(
      collection(db, "metahubEvents"),
      where("walletAddress", "==", walletAddress)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("200: Wallet address found in the database.");
      process.exit(0); // Exit with success
    } else {
      console.log("404: Wallet address not found in the database.");
      process.exit(1); // Exit with failure
    }
  } catch (error) {
    console.error("Error checking wallet address:", error);
    process.exit(1);
  }
};

// Example usage
const walletAddress = process.argv[2];

if (!walletAddress) {
  console.error("Usage: node checkAddressMetahubEvent.mjs <walletAddress>");
  process.exit(1);
}

await checkAddressMetahubEvent(walletAddress);

