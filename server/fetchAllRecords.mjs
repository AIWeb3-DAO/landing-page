import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises'; // Use promises for file operations
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
 * Fetch all records from the metahubEvents collection and write to a file.
 * @param {string} outputFile - The file to write the data to.
 */
const fetchAndWriteMetahubEvents = async (outputFile) => {
  try {
    // Get all documents in the collection
    const snapshot = await getDocs(collection(db, 'metahubEvents'));

    if (!snapshot.empty) {
      const results = snapshot.docs.map(doc => ({
        walletAddress: doc.data().walletAddress || null,
        questId: doc.data().questId || null,
        taskId: doc.data().taskId || null,
      }));

      // Convert results to JSON and write to the specified file
      const jsonData = JSON.stringify(results, null, 2);
      await fs.writeFile(outputFile, jsonData, 'utf-8');
      console.log(`Fetched data written to ${outputFile}`);
      process.exit(0); // Exit with success
    } else {
      console.log('No records found in metahubEvents collection');
      await fs.writeFile(outputFile, '[]', 'utf-8'); // Write empty array if no records
      process.exit(1); // Exit with success but no records
    }
  } catch (error) {
    console.error('Error fetching Metahub Events:', error.message);
    process.exit(2); // Exit with error
  }
};

// Get output file argument from the command line
const outputFile = process.argv[2];

if (!outputFile) {
  console.error('Please provide an output file as a parameter, e.g., node fetch_all.mjs output.txt');
  process.exit(1);
}

// Call the function
await fetchAndWriteMetahubEvents(outputFile);

