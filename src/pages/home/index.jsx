import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

export default function HomePage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-100/40 via-purple-100/40 to-fuchsia-100/40 backdrop-blur-3xl"></div>
        <div className="relative py-20">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-100">
                <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                <span className="text-sm font-medium text-purple-900">Your Growth Journey Awaits</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 leading-tight">
              Elevate Your Life with Zenith
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Your journey to personal growth starts here. Complete daily challenges across physical, mental, 
              and personal dimensions. Track your progress, earn rewards, and become your best self.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? "/challenges" : "/register"}
                className="inline-flex items-center px-6 py-3 rounded-xl text-base font-semibold
                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                  hover:from-indigo-600 hover:to-purple-600
                  transition-all duration-200 ease-out transform hover:scale-[1.02]
                  shadow-sm hover:shadow"
              >
                {isAuthenticated ? 'Explore Challenges' : 'Get Started'}
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                to={isAuthenticated ? "/leaderboard" : "/login"}
                className="inline-flex items-center px-6 py-3 rounded-xl text-base font-semibold
                  bg-white text-gray-700 hover:text-gray-900
                  hover:bg-gray-50 border border-gray-200
                  transition-all duration-200 ease-out"
              >
                {isAuthenticated ? 'View Leaderboard' : 'Sign In'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Zenith Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are transforming their lives through daily challenges and continuous growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Challenges */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100/50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Challenges</h3>
              <p className="text-gray-600">
                Choose from curated challenges or share your own achievements. Build lasting habits through daily actions and track your progress.
              </p>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100/50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Turn your achievements into rewards. Earn points for completed challenges and redeem them instantly via UPI.
              </p>
            </div>

            {/* AI Coach */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100/50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Growth Coach</h3>
              <p className="text-gray-600">
                Get personalized guidance and advice from our AI coach to accelerate your growth journey.
              </p>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100/50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Active Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals, compete on the leaderboard, and inspire others with your journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-8 border-t border-gray-100">
        <a
          href="https://github.com/Yash-007/Zenith-backend"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}
