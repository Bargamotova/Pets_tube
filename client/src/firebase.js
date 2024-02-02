import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "video-47450.firebaseapp.com",
  projectId: "video-47450",
  storageBucket: "video-47450.appspot.com",
  messagingSenderId: "759250198940",
  appId: "1:759250198940:web:6e8eb77c3e3c0ea2432859"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
