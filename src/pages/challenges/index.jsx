import ChallengeList from '../../components/features/challenges/ChallengeList';

export default function ChallengesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 mb-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-400/30 blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl"></div>

        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-lg mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>
              <span className="font-medium text-white/90">24 Active Challenges</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Daily Challenges
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Push your boundaries and achieve personal growth through our curated challenges. 
              Each completion brings you closer to becoming your best self.
            </p>
          </div>

          {/* Decorative Icon */}
          <div className="hidden lg:block">
            <div className="relative w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-lg p-6 rotate-6 transform hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5"></div>
              <div className="relative flex items-center justify-center h-full text-6xl">
                🎯
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm font-medium text-gray-500">Available Challenges</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">24</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm font-medium text-gray-500">Total Points Earned</div>
          <div className="mt-1 text-2xl font-bold text-purple-600">1,250</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm font-medium text-gray-500">Challenges Completed</div>
          <div className="mt-1 text-2xl font-bold text-green-600">15</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm font-medium text-gray-500">Current Streak</div>
          <div className="mt-1 text-2xl font-bold text-amber-600">5 days</div>
        </div>
      </div>

      {/* Challenge List */}
      <ChallengeList />

      {/* Grid Pattern Background */}
      <style jsx>{`
        .bg-grid-white\/10 {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}