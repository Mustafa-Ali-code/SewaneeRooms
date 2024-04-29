import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCKib2ZImXgVuYs8gbF2YHkrtJbQauyno4",
  authDomain: "sewaneerooms.firebaseapp.com",
  databaseURL: "https://sewaneerooms-default-rtdb.firebaseio.com",
  projectId: "sewaneerooms",
  storageBucket: "sewaneerooms.appspot.com",
  messagingSenderId: "578304502361",
  appId: "1:578304502361:web:c93523c886cd8568a09f48",
  measurementId: "G-VD1QTVPMD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, app, db };  // Export Firestore instance