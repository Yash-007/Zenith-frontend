import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { submissionApi } from '../../services/api';

const statusMap = {
  'PENDING': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  'COMPLETED': { label: 'Completed', color: 'bg-green-100 text-green-800' },
  'REJECTED': { label: 'Rejected', color: 'bg-red-100 text-red-800' }
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
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

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-red-600 mb-2">Not Authenticated</p>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {currentUser.avatar && !currentUser.avatar.includes('example.com') ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMzIgMjhDMzYuNDIgMjggNDAgMjQuNDIgNDAgMjBDNDAgMTUuNTggMzYuNDIgMTIgMzIgMTJDMjcuNTggMTIgMjQgMTUuNTggMjQgMjBDMjQgMjQuNDIgMjcuNTggMjggMzIgMjhaIiBmaWxsPSIjOTA5M0E1Ii8+PHBhdGggZD0iTTQ4IDQ4QzQ4IDQxLjM3IDQwLjg0IDM2IDMyIDM2QzIzLjE2IDM2IDE2IDQxLjM3IDE2IDQ4IiBzdHJva2U9IiM5MDkzQTUiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==';
                }}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span>{currentUser.age} years</span>
                <span>•</span>
                <span>{currentUser.city}</span>
                <span>•</span>
                <span>Level: {currentUser.level}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800">
              <span className="text-lg mr-2">🏆</span>
              <span className="font-medium">{currentUser.currentPoints} points</span>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-medium text-gray-500">Current Streak</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-amber-600">{currentUser.currentStreak}</span>
              <span className="ml-1 text-gray-600">days</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-medium text-gray-500">Longest Streak</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-amber-600">{currentUser.longestStreak}</span>
              <span className="ml-1 text-gray-600">days</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-medium text-gray-500">Total Points Earned</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-purple-600">{currentUser.totalPointsEarned}</span>
              <span className="ml-1 text-gray-600">points</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-medium text-gray-500">Points Used</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-purple-600">{currentUser.pointsUsed}</span>
              <span className="ml-1 text-gray-600">points</span>
            </div>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-sm font-medium text-green-800">Accepted</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-green-600">{currentUser.challengesCompleted}</span>
              <span className="ml-1 text-green-700">challenges</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="text-sm font-medium text-yellow-800">Under Review</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-yellow-600">{currentUser.challengesInReview}</span>
              <span className="ml-1 text-yellow-700">challenges</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-sm font-medium text-blue-800">Total Submitted</div>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-bold text-blue-600">{currentUser.challengesSubmitted}</span>
              <span className="ml-1 text-blue-700">challenges</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Member since:</span>{' '}
            {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Submissions</h2>
        
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-600">Something went wrong!</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
        ) : recentSubmissions?.length > 0 ? (
          <div className="space-y-4">
            {recentSubmissions?.map((submission) => (
              <button
                key={submission.id}
                onClick={() => navigate(`/submissions/${submission.id}`)}
                className="w-full text-left bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900">
                    {submission.challengeName || 'Custom Submission'}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusMap[submission.status].color}`}>
                    {statusMap[submission.status].label}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                </p>
              </button>
            ))}
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
                    ${currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
                    ${currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  Next
                  <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No submissions yet</p>
            <p className="text-sm text-gray-500 mt-2">Start completing challenges to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
