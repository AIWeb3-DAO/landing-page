// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const { spawn } = require('child_process');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend app's origin
}));

app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// Run updateTIME.js in the background
const updateTimeProcess = spawn('node', [path.resolve(__dirname, 'updateTIME.mjs')], {
  stdio: 'inherit'
});

updateTimeProcess.on('error', (err) => {
  console.error('Failed to start updateTIME.mjs:', err);
});

updateTimeProcess.on('exit', (code, signal) => {
  if (code) console.error('updateTIME.mjs exited with code', code);
  if (signal) console.error('updateTIME.mjs was killed with signal', signal);
});