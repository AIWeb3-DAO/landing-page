import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';

// Define __dirname for ES modules compatibility
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

const fetchVideosByIndex = async (startIndex = 0) => {
    try {
        const batchSize = 10;  // Fetch 10 records each time
        let results = [];

        // Step 1: Fetch all documents ordered by timestamp
        const allDocsQuery = query(collection(db, 'youtube'), orderBy('timestamp', 'desc'));
        const allDocsSnapshot = await getDocs(allDocsQuery);
        
        if (allDocsSnapshot.empty) {
            console.log('No records found in the YouTube collection.');
            return;
        }

        // Step 2: Convert all records into a list and paginate manually
        const allDocs = allDocsSnapshot.docs;
        const startDoc = allDocs[startIndex]; // Get the starting document based on the index

        if (!startDoc) {
            console.log('Start index exceeds the available records.');
            return;
        }

        // Step 3: Query with startAfter to get the next batch
        const paginatedQuery = query(
            collection(db, 'youtube'),
            orderBy('timestamp', 'desc'),
            startAfter(startDoc),
            limit(batchSize)
        );

        const paginatedSnapshot = await getDocs(paginatedQuery);
        
        results = paginatedSnapshot.docs.map(doc => ({
            id: doc.id,
            timestamp: doc.data().timestamp || null,
            youtubeTitle: doc.data().youtubeTitle ? String(doc.data().youtubeTitle).replace(/[\n\r"]/g, '') : null,
            youtubeURL: doc.data().youtubeURL || null,
            author: doc.data().author ? String(doc.data().author).replace(/[\n\r"]/g, '') : null,
        }));

        // Return results
        console.log(JSON.stringify(results, null, 2));

    } catch (error) {
        console.error('Error fetching YouTube data:', error.message);
    } finally {
        process.exit(0);
    }
};

// Capture the starting index from the command line arguments
const startIndex = process.argv[2] ? parseInt(process.argv[2]) : 0;
fetchVideosByIndex(startIndex);
