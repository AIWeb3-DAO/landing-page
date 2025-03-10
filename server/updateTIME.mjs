
// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, addDoc, getDocs, doc, setDoc, serverTimestamp , getFirestore } from "firebase/firestore";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatBalance } from "@polkadot/util";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

//console.log("now printing the api : ", firebaseConfig.apiKey)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// 🔹 Acala API Endpoint
const ACA_CHAIN_WS = "wss://acala-polkadot.api.onfinality.io/public-ws";
const address = "5GQz97DoibBxkRjBg4zYQF2GzNipMMkEotX2zn8CW7xiLoVA"; // ✅ Address for the LOVA PUMP bot
const addressTreasury = "5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT"  // this is for the aiweb3 treasury

// ✅ Function to Fetch ACA & LOVA Balances
const fetchBalances = async () => {
  try {
    // Connect to Acala API
    const provider = new WsProvider(ACA_CHAIN_WS);
    const apiAcala = await ApiPromise.create({ provider });
    await apiAcala.isReady;

    // 🔹 Fetch ACA Balance
    const { data: acaBalance } = await apiAcala.query.system.account(address);
    const formattedAcaBalance = formatBalance(acaBalance.free, {
      decimals: 12,
      withUnit: "ACA",
    });

    // 🔹 Fetch LOVA Balance
    const assetId = 18; // ✅ LOVA asset ID on Acala
    const lovaBalance = await apiAcala.query.tokens.accounts(address, { ForeignAsset: assetId });
    const formattedLovaBalance = formatBalance(lovaBalance.free, {
      decimals: 12,
      withUnit: "LOVA",
    });

    // 🔹 Fetch ACA Balance for treasury
    const { data: acaBalanceTreasury } = await apiAcala.query.system.account(addressTreasury);
    const formattedAcaBalanceTreasury = formatBalance(acaBalanceTreasury.free, {
      decimals: 12,
      withUnit: "ACA",
    });

    // 🔹 Fetch LOVA Balance for treasury
    const lovaBalanceTreasury = await apiAcala.query.tokens.accounts(addressTreasury, { ForeignAsset: assetId });
    const formattedLovaBalanceTreasury = formatBalance(lovaBalanceTreasury.free, {
      decimals: 12,
      withUnit: "LOVA",
    });    

    return {
      acalaBalancePUMPBOT: formattedAcaBalance,
      lovaBalancePUMPBOT: formattedLovaBalance,
      acalaBalanceTreasury: formattedAcaBalanceTreasury,
      lovaBalanceTreasury: formattedLovaBalanceTreasury,
    };
  } catch (error) {
    console.error("Error fetching balances:", error);
    return { acalaBalance: "0 ACA", lovaBalance: "0 LOVA" };
  }
};
const updateDatabase = async () => {
  try {
    const data = { timestamp: serverTimestamp() };
    //console.log('Updating document with data:', data);
    const docRef = doc(db, "keyINFO", "time");
    await setDoc(docRef, data, { merge: true });
    console.log("Timestamp updated");

    const balances = await fetchBalances();
    const data2 = {
      acalaBalancePUMPBOT: balances.acalaBalancePUMPBOT, // 🔹 Stores ACA Balance
      lovaBalancePUMPBOT: balances.lovaBalancePUMPBOT,   // 🔹 Stores LOVA Balance
      acalaBalanceTreasury: balances.acalaBalanceTreasury, // 🔹 Stores ACA Balance for treasury
      lovaBalanceTreasury: balances.lovaBalanceTreasury,   // 🔹 Stores LOVA Balance for treasury
    };

    const docRef2 = doc(db, "keyINFO", "balance");
    await setDoc(docRef2, data2, { merge: true });

    console.log("balance updated");
  } catch (error) {
    console.error("Error updating timestamp or balance:", error);
  }
};



// Update the timestamp every 10 seconds
setInterval(updateDatabase, 10000);
