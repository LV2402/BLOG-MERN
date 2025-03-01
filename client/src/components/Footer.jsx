import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

function Footer() {
  return (
    <footer className="border-t-8 border-teal-500 bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-xl font-semibold">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Vamshi's
              </span>{' '}
              Blog
            </Link>
            <p className="mt-3 text-gray-400 text-center md:text-left">
              Share your thoughts with the world!
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                    100 JS Projects
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-teal-400">
                    About Vamshi's Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://github.com/vamshi" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Vamshi's Blog. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <BsFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <BsInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <BsTwitter size={20} />
            </a>
            <a href="https://github.com/vamshi" className="text-gray-400 hover:text-teal-400">
              <BsGithub size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <BsDribbble size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
