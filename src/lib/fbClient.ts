import { fireBaseConfigInfo } from "@/constants";
import {initializeApp}  from "firebase/app"
import {getFirestore}  from 'firebase/firestore'


 export const fireBaseConfig = {
    apiKey: fireBaseConfigInfo.API_KEY,
    authDomain: fireBaseConfigInfo.AUTH_DOMAIN,
    projectId: fireBaseConfigInfo.PROJECT_ID,
    storageBucket: fireBaseConfigInfo.BUCKET_ID,
    messagingSenderId: fireBaseConfigInfo.SENDER_ID,
    appId: fireBaseConfigInfo.APP_ID,
    measurementId: fireBaseConfigInfo.MEASUREMENT_ID
 }

  export  const FB_APP = initializeApp(fireBaseConfig);
  export const FB_DB = getFirestore(FB_APP);