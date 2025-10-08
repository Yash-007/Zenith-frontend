import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import { submissionApi } from '../../services/api';
import SubmissionHeatmap from '../../components/features/profile/SubmissionHeatmap';

const statusMap = {
  'PENDING': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  'COMPLETED': { label: 'Completed', color: 'bg-green-100 text-green-800' },
  'REJECTED': { label: 'Rejected', color: 'bg-red-100 text-red-800' }
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecentSubmissions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await submissionApi.getUserSubmissions(currentPage);
        
        if (response.success) {
          setRecentSubmissions(response.data.submissions);
          if (response.data.currentPage !== currentPage) {
            setCurrentPage(response.data.currentPage);
          }
          setTotalPages(response.data.totalPages);
        } else {
          throw new Error(response?.response?.data?.message || 'Failed to load submissions');
        }
      } catch (err) {
        console.error('Submissions Load Error:', err);
        setError('Failed to load submissions' || err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentSubmissions();
  }, [currentPage]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {currentUser.avatar && !currentUser.avatar.includes('example.com') ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-100"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMzIgMjhDMzYuNDIgMjggNDAgMjQuNDIgNDAgMjBDNDAgMTUuNTggMzYuNDIgMTIgMzIgMTJDMjcuNTggMTIgMjQgMTUuNTggMjQgMjBDMjQgMjQuNDIgMjcuNTggMjggMzIgMjhaIiBmaWxsPSIjOTA5M0E1Ii8+PHBhdGggZD0iTTQ4IDQ4QzQ4IDQxLjM3IDQwLjg0IDM2IDMyIDM2QzIzLjE2IDM2IDE2IDQxLjM3IDE2IDQ4IiBzdHJva2U9IiM5MDkzQTUiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==';
                }}
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600">
                <span>{currentUser.age} years</span>
                <span className="hidden sm:inline">•</span>
                <span>{currentUser.city}</span>
                <span className="hidden sm:inline">•</span>
                <span>Level: {currentUser.level}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800">
              <span className="text-base sm:text-lg mr-1.5 sm:mr-2">🏆</span>
              <span className="text-sm sm:text-base font-medium">{currentUser.currentPoints} points</span>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-gray-500">Current Streak</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-amber-600">{currentUser.currentStreak}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-600">days</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-gray-500">Longest Streak</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-amber-600">{currentUser.longestStreak}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-600">days</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-gray-500">Total Points</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-purple-600">{currentUser.totalPointsEarned}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-600">pts</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-gray-500">Points Used</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-purple-600">{currentUser.pointsUsed}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-600">pts</span>
            </div>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
          <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-green-800">Accepted</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-green-600">{currentUser.challengesCompleted}</span>
              <span className="ml-1 text-xs sm:text-sm text-green-700">challenges</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-yellow-800">Under Review</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-yellow-600">{currentUser.challengesInReview}</span>
              <span className="ml-1 text-xs sm:text-sm text-yellow-700">challenges</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-medium text-blue-800">Total Submitted</div>
            <div className="mt-1 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">{currentUser.challengesSubmitted}</span>
              <span className="ml-1 text-xs sm:text-sm text-blue-700">challenges</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Member since:</span>{' '}
            {new Date(currentUser.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Submission Heatmap */}
      <SubmissionHeatmap submissions={recentSubmissions} />

      {/* Recent Submissions */}
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Submissions</h2>
        
        {isLoading ? (
          <div className="space-y-3 sm:space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="mt-2 h-3 sm:h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-red-600">Something went wrong!</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">{error}</p>
          </div>
        ) : recentSubmissions?.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentSubmissions?.map((submission) => (
              <button
                key={submission.id}
                onClick={() => navigate(`/submissions/${submission.id}`)}
                className="w-full text-left bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-1">
                  <h3 className="font-medium text-sm sm:text-base text-gray-900">
                    {submission.challengeName || 'Custom Submission'}
                  </h3>
                  <div className={`self-start sm:self-auto px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusMap[submission.status].color}`}>
                    {statusMap[submission.status].label}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Submitted on {new Date(submission.submittedAt).toLocaleDateString('en-IN')}
                </p>
              </button>
            ))}
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200
                    ${currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <span className="text-xs sm:text-sm text-gray-700 order-first sm:order-none">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200
                    ${currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  Next
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-gray-600">No submissions yet</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Start completing challenges to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
