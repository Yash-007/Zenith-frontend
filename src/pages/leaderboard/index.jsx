import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { userApi } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';

const ageRanges = [
  { label: 'All Ages', value: 'all', lowerAge: null, upperAge: null },
  { label: '18-24', value: '18-24', lowerAge: 18, upperAge: 24 },
  { label: '25-34', value: '25-34', lowerAge: 25, upperAge: 34 },
  { label: '35-44', value: '35-44', lowerAge: 35, upperAge: 44 },
  { label: '45+', value: '45+', lowerAge: 45, upperAge: 100 }
];

export default function LeaderboardPage() {
  const currentUser = useSelector(selectCurrentUser);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [cityInput, setCityInput] = useState('');
  const [showFindMe, setShowFindMe] = useState(false);
  
  const cityInputRef = useRef(null);
  const debouncedCity = useDebounce(cityInput, 1000);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get age range values
        const selectedRange = ageRanges.find(range => range.value === selectedAgeRange);
        
        const params = {
          page: currentPage,
          ...(selectedRange?.lowerAge && { lowerAge: selectedRange.lowerAge }),
          ...(selectedRange?.upperAge && { upperAge: selectedRange.upperAge }),
          ...(debouncedCity && { city: debouncedCity.trim() }),
          ...(showFindMe && { fetchUser: true })
        };

        const response = await userApi.getLeaderboard(params);
        
        if (response.success) {
          setUsers(response.data);
        } else {
          throw new Error(response?.response?.data?.message || 'Failed to load leaderboard');
        }
      } catch (err) {
        console.error('Leaderboard Load Error:', err);
        setError('Failed to load leaderboard' || err?.message);
      } finally {
        setIsLoading(false);
        setShowFindMe(false); // Reset after fetching
      }
    };

    fetchLeaderboard();
  }, [currentPage, selectedAgeRange, debouncedCity, showFindMe]);

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
    setCurrentPage(1);
  };

  const handleAgeRangeChange = (e) => {
    const value = e.target.value;
    setSelectedAgeRange(value);
    setCurrentPage(1);
  };

  const handleFindMe = () => {
    setShowFindMe(true);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-red-600 mb-2">Failed to load leaderboard</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">
          See how you stack up against other users in the community.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        {/* Filters */}
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Filters</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City Filter */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  ref={cityInputRef}
                  value={cityInput}
                  onChange={handleCityChange}
                  placeholder="Filter by city"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Age Range Filter */}
              <div>
                <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <select
                  id="ageRange"
                  value={selectedAgeRange}
                  onChange={handleAgeRangeChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {ageRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Find Me Button */}
        <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0">
          <button
            onClick={handleFindMe}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
              hover:from-indigo-600 hover:to-purple-600 text-white font-medium transition-all duration-200 
              shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]
              flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <span>Find My Rank</span>
          </button>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {users.map((user, index) => {
            const position = (currentPage - 1) * 10 + index + 1;
            const isCurrentUser = user.id === currentUser?.id;

            return (
              <div 
                key={user.id}
                className={`p-4 flex items-center space-x-4 ${
                  isCurrentUser ? 'bg-purple-50' : 'hover:bg-gray-50'
                }`}
              >
                {/* Position */}
                <div className="flex-shrink-0 w-12 text-center">
                  <span className={`text-lg font-bold ${
                    position === 1 ? 'text-yellow-500' : // Gold
                    position === 2 ? 'text-slate-400' : // Silver
                    position === 3 ? 'text-amber-600' : // Bronze
                    'text-gray-600'
                  }`}>
                    #{position}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23CBD5E1"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%2394A3B8" text-anchor="middle" dy=".3em">${user.name.charAt(0)}</text></svg>`;
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate flex items-center">
                        {user.name}
                        {isCurrentUser && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {[
                          user.city,
                          user.age && `${user.age} years`,
                          `Level ${user.level}`
                        ].filter(Boolean).join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-purple-600">
                        {user.currentPoints}
                      </span>
                      <span className="text-sm text-gray-500">pts</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {user.challengesCompleted} challenges completed
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={users.length < 10}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}