// Import Firebase core
import { initializeApp } from "firebase/app";

// 🔥 Import Firestore
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmhcLrSvl2_WVrJ_ARrlCt2MEQHzdAUtw",
  authDomain: "pinkstore-a34d3.firebaseapp.com",
  projectId: "pinkstore-a34d3",
  storageBucket: "pinkstore-a34d3.firebasestorage.app",
  messagingSenderId: "897227414784",
  appId: "1:897227414784:web:a1a708975292977a2ea7e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 INIT FIRESTORE
export const db = getFirestore(app);

// (optional)
export default app;
