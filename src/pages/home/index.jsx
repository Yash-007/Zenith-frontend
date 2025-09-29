export default function HomePage() {
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
              <a
                href="/challenges"
                className="inline-flex items-center px-6 py-3 rounded-xl text-base font-semibold
                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                  hover:from-indigo-600 hover:to-purple-600
                  transition-all duration-200 ease-out transform hover:scale-[1.02]
                  shadow-sm hover:shadow"
              >
                Explore Challenges
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="/leaderboard"
                className="inline-flex items-center px-6 py-3 rounded-xl text-base font-semibold
                  bg-white text-gray-700 hover:text-gray-900
                  hover:bg-gray-50 border border-gray-200
                  transition-all duration-200 ease-out"
              >
                View Leaderboard
              </a>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Path</h3>
              <p className="text-gray-600">
                Select from various categories that match your interests and goals
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Challenges</h3>
              <p className="text-gray-600">
                Take on daily challenges that push you towards your goals
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Get points for completed challenges and redeem them for rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
