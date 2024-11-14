import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
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
 * Query if the task is finished for a given address, questId, and taskId
 * @param {string} address - The wallet address
 * @param {string} questId - The quest ID
 * @param {string} taskId - The task ID
 */
const queryMetahubTask = async (address, questId, taskId) => {
  if (!address || !questId || !taskId) {
    console.error('Missing required fields: address, questId, or taskId');
    process.exit(1);
  }

  try {
    // Query the Firestore collection
    const q = query(
      collection(db, 'metahubEvents'),
      where('walletAddress', '==', address),
      where('questId', '==', questId),
      where('taskId', '==', taskId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('finished');
      process.exit(0); // Exit with success
    } else {
      console.log('not finished');
      process.exit(1); // Exit with success but no match
    }
  } catch (error) {
    console.error('Error querying task status:', error.message);
    process.exit(2);
  }
};

// Get arguments from the command line
const [address, questId, taskId] = process.argv.slice(2);

// Call the function
await queryMetahubTask(address, questId, taskId);

