import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "text-indigo-500 font-semibold" : "text-gray-700");

  return (
    <header className="border-b-2 px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Vamshi's
        </span>
        Blog
      </Link>

      {/* Center Content - Search bar OR Links */}
      <div className="hidden lg:flex items-center gap-6">
        {/* Search Bar with Icon Inside */}
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Links (visible when search is present) */}
        <nav className="flex gap-4">
          <Link to="/" className={`text-lg ${isActive("/")}`}>Home</Link>
          <Link to="/about" className={`text-lg ${isActive("/about")}`}>About</Link>
          <Link to="/projects" className={`text-lg ${isActive("/projects")}`}>Projects</Link>
        </nav>
      </div>

      {/* Right Side Icons and Buttons */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 hidden sm:inline">
          <FaMoon className="text-xl" />
        </button>
        <Link to="/sign-in">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg">
            Sign In
          </button>
        </Link>

        {/* Mobile Menu Button (Only visible when search bar is hidden) */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (Only when search is hidden) */}
      {!isOpen ? null : (
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-3 py-4 lg:hidden">
          <Link to="/" className={`text-lg ${isActive("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className={`text-lg ${isActive("/about")}`} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/projects" className={`text-lg ${isActive("/projects")}`} onClick={() => setIsOpen(false)}>Projects</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
