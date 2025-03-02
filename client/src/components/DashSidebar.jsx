import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-56 h-screen bg-gray-900 text-white flex flex-col p-4">
      <ul className="space-y-2">
        {currentUser?.isAdmin && (
          <li>
            <Link
              to="/dashboard?tab=dash"
              className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                tab === 'dash' || !tab ? 'bg-gray-700' : ''
              }`}
            >
              <HiChartPie className="mr-3" />
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/dashboard?tab=profile"
            className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
              tab === 'profile' ? 'bg-gray-700' : ''
            }`}
          >
            <HiUser className="mr-3" />
            Profile
          </Link>
        </li>
        {currentUser?.isAdmin && (
          <>
            <li>
              <Link
                to="/dashboard?tab=posts"
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  tab === 'posts' ? 'bg-gray-700' : ''
                }`}
              >
                <HiDocumentText className="mr-3" />
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=users"
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  tab === 'users' ? 'bg-gray-700' : ''
                }`}
              >
                <HiOutlineUserGroup className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=comments"
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  tab === 'comments' ? 'bg-gray-700' : ''
                }`}
              >
                <HiAnnotation className="mr-3" />
                Comments
              </Link>
            </li>
          </>
        )}
        <li>
          <button
            onClick={handleSignout}
            className="w-full flex items-center p-2 rounded-md hover:bg-red-600"
          >
            <HiArrowSmRight className="mr-3" />
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
