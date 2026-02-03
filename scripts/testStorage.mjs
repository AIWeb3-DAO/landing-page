import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    });
}

const storage = admin.storage();

async function testDownload(gsPath) {
    console.log(`🔍 Testing Signed URL generation for: ${gsPath}`);
    try {
        const bucket = storage.bucket();
        const file = bucket.file(gsPath);

        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour
        });

        console.log("✅ Successfully generated Signed URL:");
        console.log(url);
    } catch (error) {
        console.error("❌ Failed to get Signed URL:");
        console.error(error);
    }
}

// Test with the file mentioned by the user
const testFile = "qwen3TTS/results/output_FLMG8bSwFidLwHpK7MS5.wav";
testDownload(testFile);
