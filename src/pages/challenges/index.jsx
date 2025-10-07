import ChallengeList from '../../components/features/challenges/ChallengeList';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { useSelector } from 'react-redux';

export default function ChallengesPage() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute -left-10 -top-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-purple-400/30 blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-pink-400/30 blur-3xl"></div>

        {/* Content */}
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-2.5 sm:px-3 py-1 text-xs sm:text-sm backdrop-blur-lg mb-4">
              <span className="flex h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-emerald-400 mr-1.5 sm:mr-2"></span>
              <span className="font-medium text-white/90">50+ Active Challenges</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Daily Challenges
            </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Push your boundaries through our curated challenges or share your own achievements. 
                Each step brings you closer to becoming your best self.
              </p>
          </div>

          {/* Decorative Icon */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-lg p-5 sm:p-6 rotate-6 transform hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5"></div>
              <div className="relative flex items-center justify-center h-full text-5xl sm:text-6xl">
                🎯
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-500">Available</div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">60</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-500">Completed</div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{user?.challengesCompleted}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-500">Points</div>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{user?.currentPoints}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-500">Streak</div>
              <div className="text-lg sm:text-2xl font-bold text-amber-600">{user?.currentStreak} days</div>
            </div>
          </div>
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