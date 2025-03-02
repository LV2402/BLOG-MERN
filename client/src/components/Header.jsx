import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const isActive = (path) =>
    location.pathname === path ? 'text-indigo-400 font-semibold' : 'text-gray-300';

  return (
    <header className="bg-gray-800 text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-lg sm:text-2xl font-semibold flex items-center gap-2">
        <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Vamshi's
        </span>
        <span className="hidden sm:inline">Blog</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        <Link to="/" className={`text-lg ${isActive('/')}`}>
          Home
        </Link>
        <Link to="/about" className={`text-lg ${isActive('/about')}`}>
          About
        </Link>
        <Link to="/projects" className={`text-lg ${isActive('/projects')}`}>
          Projects
        </Link>
      </nav>

      {/* Center Search Bar */}
      <div className="hidden lg:flex items-center w-1/3 relative">
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Navigation & User Actions */}
      <div className="flex items-center gap-4 relative">
        <button className="hidden sm:inline" onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </button>

        {currentUser ? (
          <div className="relative">
            <img
              src={currentUser.googlePhotoUrl}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-500 hover:border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 shadow-lg rounded-lg py-2">
                <p className="px-4 py-2 text-sm font-semibold">@{currentUser.username}</p>
                <p className="px-4 py-2 text-sm">{currentUser.email}</p>
                <hr className="border-gray-300" />
                <Link to="/dashboard?tab=profile" className="block px-4 py-2 hover:bg-gray-200">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    dispatch(signOut());
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/sign-in">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg border border-white hover:scale-105 transition transform">
              Sign In
            </button>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-800 shadow-md flex flex-col items-center gap-3 py-4 lg:hidden">
          <Link to="/" className={`text-lg ${isActive('/')}`} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" className={`text-lg ${isActive('/about')}`} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/projects" className={`text-lg ${isActive('/projects')}`} onClick={() => setIsOpen(false)}>
            Projects
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
