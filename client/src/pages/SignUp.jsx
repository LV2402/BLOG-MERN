import { Link } from 'react-router-dom';

function SignUp() {
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
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Your Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Your Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-indigo-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
