import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

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

const fetchLatestData = async () => {
  try {
    // Fetch the latest document from the "metaQueryData" collection
    const metaQueryDataCollection = collection(db, 'metahubQueryData');
    const latestQueryData = query(
      metaQueryDataCollection,
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(latestQueryData);

    console.log('Latest data from metaQueryData:');
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    // Fetch the latest document from the "metaEvents" collection
    const metaEventsCollection = collection(db, 'metahubEvents');
    const latestEventData = query(
      metaEventsCollection,
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const eventSnapshot = await getDocs(latestEventData);

    console.log('Latest data from metaEvents:');
    eventSnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error fetching latest data:', error);
  }
};

// Execute the function
fetchLatestData();

