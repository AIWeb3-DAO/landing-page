import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadCloneVoice() {
    try {
        // Read the audio file
        const audioPath = "/Users/cao/CAO/github/quantTrading/qwen3TTS/cao_sample.wav";
        const audioBuffer = readFileSync(audioPath);

        // Create storage reference
        const storageRef = ref(storage, "qwen3TTS/samples/cao_sample.wav");

        // Upload file
        console.log("Uploading cao_sample.wav to Firebase Storage...");
        const snapshot = await uploadBytes(storageRef, audioBuffer, {
            contentType: "audio/wav",
        });

        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("✅ Upload successful!");
        console.log("📁 Storage Path:", snapshot.ref.fullPath);
        console.log("🔗 Download URL:", downloadURL);
        console.log("🔗 GS URL:", `gs://${snapshot.ref.bucket}/${snapshot.ref.fullPath}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Upload failed:", error.message);
        process.exit(1);
    }
}

uploadCloneVoice();
