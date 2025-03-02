import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleClick() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
  
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
  
      if (!resultsFromGoogle.user) {
        throw new Error("Google authentication failed");
      }
  
      const res = await fetch("http://localhost:3000/user-api/google", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
        credentials: "include",
      });
      
  
      const data = await res.json();
      console.log("Received data from backend:", data); // Debug log
  
      if (res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
    }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }
  

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 px-4 py-2 w-full text-white font-semibold bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 ease-in-out"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6" />
      Continue with Google
    </button>
  );
}

export default OAuth;
