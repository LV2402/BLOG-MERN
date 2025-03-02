import { useSelector } from "react-redux";
import { useState, useRef } from "react";

function DashProfile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const filePickerRef = useRef();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Profile
        </h1>

        {/* Profile Picture Input */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            hidden
            ref={filePickerRef}
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 cursor-pointer"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : currentUser?.profilePicture}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser?.username}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser?.email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition duration-200"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Actions */}
        <div className="flex justify-between text-sm text-red-500 mt-6">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
