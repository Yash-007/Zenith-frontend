import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

export default function HomePage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 via-white to-indigo-50"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Combined Banner */}
                <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 mb-8 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center">
                    <span className="relative flex h-2.5 w-2.5 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                    <span className="text-sm font-medium text-purple-900">Start your journey</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mx-2 text-sm font-medium text-amber-700">•</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-amber-800">Complete challenges, earn cash rewards</span>
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight lg:leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Transform Your Life
                  </span>
                  <br />
                  <span className="text-gray-900">One Challenge at a Time</span>
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl lg:max-w-none">
                  Join a community of achievers completing daily challenges across physical, mental, 
                  and personal dimensions. Track your progress, earn rewards, and become your best self.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <Link
                    to={isAuthenticated ? "/challenges" : "/register"}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl
                      text-base font-semibold relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300
                      group-hover:from-purple-700 group-hover:to-indigo-700"></span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)]"></span>
                    <span className="relative text-white flex items-center">
                      {isAuthenticated ? 'Explore Challenges' : 'Get Started'}
                      <svg className="w-5 h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    to={isAuthenticated ? "/leaderboard" : "/login"}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl
                      text-base font-semibold bg-white text-gray-700 border border-gray-200
                      hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50
                      transition-all duration-200 shadow-sm hover:shadow"
                  >
                    {isAuthenticated ? 'View Leaderboard' : 'Sign In'}
                  </Link>
                </div>

                {/* Feature Pills */}
                <div className="mt-12 flex flex-wrap gap-3">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-100">
                    <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-purple-700">Daily Challenges</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100">
                    <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-indigo-700">Instant Rewards</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-pink-50 border border-pink-100">
                    <svg className="w-4 h-4 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm text-pink-700">Track Progress</span>
                  </div>
                </div>
              </div>

              {/* Right Image/Animation */}
              <div className="flex-1 relative hidden lg:block">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Background blur effects */}
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                  {/* Main Image Container */}
                  <div className="relative">
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                      <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center">
                      <img src="/home-image.png" alt="Home" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
