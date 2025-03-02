// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3b63f.firebaseapp.com",
  projectId: "mern-blog-3b63f",
  storageBucket: "mern-blog-3b63f.firebasestorage.app",
  messagingSenderId: "963680067774",
  appId: "1:963680067774:web:b50b8d3411fca5ddd8feef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app