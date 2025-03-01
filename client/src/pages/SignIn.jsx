import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const{loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }
  
    try {
      dispatch(signInStart());
  
      const res = await fetch('http://localhost:3000/user-api/signin', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return dispatch(signInFailure(data.message || "Invalid credentials"));
      }
  
      dispatch(signInSuccess(data));
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/'); 
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }  

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vamshi's
            </span>{' '}
            Blog
          </Link>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Join us today and share your thoughts with the world!
          </p>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex-1 p-8 bg-white shadow-md rounded-lg dark:bg-gray-900">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Your Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Dont have an account?{' '}
            <Link to="/sign-up" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
          {errorMessage && (
            <div className="mt-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
