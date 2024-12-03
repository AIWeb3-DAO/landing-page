// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const db = getFirestore(app);

/**
 * Store data into the "metahubQueryData" collection in Firestore
 * @param {string} address - The user's wallet address
 * @param {string} email - The user's email (optional)
 * @param {string} telegramId - The user's Telegram ID (optional)
 * @param {string} gmail - The user's Gmail address (optional)
 * @param {string} questId - The quest ID
 * @param {string} taskId - The task ID
 */
const storeMetahub = async (address, email, telegramId, gmail, questId, taskId) => {
  if (!address || !questId || !taskId) {
    console.error("Missing required fields: address, questId, or taskId");
    process.exit(1);
  }
  // Convert the wallet address to lowercase before storing
  const normalizedAddress = address.toLowerCase();

  try {
    // Add data to the "metahubQueryData" collection
    const docRef = await addDoc(collection(db, "metahubQueryData"), {
      address:normalizedAddress,
      email,
      telegramId,
      gmail,
      questId,
      taskId,
      createdAt: serverTimestamp(),
    });

    console.log(`Document added with ID: ${docRef.id}`);
    process.exit(0); // Exit with success
  } catch (error) {
    console.error("Error adding document to metahubQueryData:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Get arguments from the command line
const [address, email = '', telegramId = '', gmail = '', questId, taskId] = process.argv.slice(2);

// Call the main function
await storeMetahub(address, email, telegramId, gmail, questId, taskId);

