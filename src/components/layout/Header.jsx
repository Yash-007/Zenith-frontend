import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'AI Coach', href: '/coach' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                <span className="text-xl text-white font-bold">Z</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Zenith
              </span>
            </a>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 
                  relative group transition-colors duration-200"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 
                  group-hover:w-full transition-all duration-200" />
              </a>
            ))}

            {/* Profile/Login Button */}
            <button className="ml-6 inline-flex items-center justify-center px-4 py-2 rounded-xl
              text-sm font-medium transition-all duration-200 ease-out
              bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
              text-white shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 -m-2.5 p-2.5"
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4 pb-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-900 hover:text-purple-600
                    transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <button className="mt-2 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl
                text-base font-medium transition-all duration-200 ease-out
                bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                text-white shadow-sm hover:shadow">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}