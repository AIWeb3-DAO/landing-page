import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Function to fetch Firebase configuration from API endpoint
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('http://localhost:10334/api/config');
    //console.log(response);
    const config = await response.json();
    return config;
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    return null;
  }
};

// Initialize Firebase app and Firestore
const initializeFirebase = async () => {
  const firebaseConfig = await fetchFirebaseConfig();

  if (firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
  }
  return null;
};

// Export the Firestore database instance
const dbPromise = initializeFirebase();
export { dbPromise };
