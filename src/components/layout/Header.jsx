import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { selectIsAuthenticated, logout } from '../../store/slices/authSlice';

const publicNavigation = [
  { name: 'Home', href: '/' },
];

const privateNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Challenges', href: '/challenges' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'AI Coach', href: '/coach' },
];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const navigation = isAuthenticated ? privateNavigation : publicNavigation;
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8" aria-label="Top">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                <span className="text-lg sm:text-xl text-white font-bold">Z</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Zenith
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  text-sm font-medium relative group transition-colors duration-200
                  ${isActive ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}
                `}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 
                  group-hover:w-full transition-all duration-200" />
              </NavLink>
            ))}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl
                    text-sm font-medium transition-colors duration-200
                    text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>Account</span>
                </button>

                {/* Profile Dropdown */}
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 transform origin-top-right transition-all duration-200 ${profileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setProfileMenuOpen(false);
                      }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 
                      hover:text-gray-900 transition-colors duration-200 first:rounded-t-lg"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileMenuOpen(false);
                      }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 
                      hover:text-gray-900 transition-colors duration-200 last:rounded-b-lg"
                    >
                      Sign Out
                    </button>
                  </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl
                    text-sm font-medium transition-all duration-200 ease-out
                    bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                    text-white shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative -mr-1 p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-200"
            >
              <span className="sr-only">Toggle menu</span>
              <div className="relative w-6 h-6">
                <Bars3Icon
                  className={`absolute inset-0 w-6 h-6 transition-all duration-200 ease-in-out transform
                    ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                  aria-hidden="true"
                />
                <XMarkIcon
                  className={`absolute inset-0 w-6 h-6 transition-all duration-200 ease-in-out transform
                    ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4 pb-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    block px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-200
                    ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-900 hover:bg-gray-50 hover:text-purple-600'}
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg
                      text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-purple-600
                      transition-colors duration-200"
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg
                      text-base font-medium transition-all duration-200 ease-out
                      bg-gray-50 text-gray-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium
                      text-gray-900 hover:bg-gray-50 hover:text-purple-600
                      transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium
                      text-white bg-gradient-to-r from-indigo-500 to-purple-500 
                      hover:from-indigo-600 hover:to-purple-600 transition-all duration-200
                      shadow-sm hover:shadow text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
}