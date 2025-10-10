import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { rewardApi } from '../../services/api';

const rewardRules = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15.75V18.75M12 15.75L6.5 13.25M12 15.75L17.5 13.25M12 21.75L6.5 19.25V13.25M12 21.75L17.5 19.25V13.25M6.5 13.25L12 10.75L17.5 13.25M15 4.75H17C17.5523 4.75 18 5.19772 18 5.75V7.75M9 4.75H7C6.44772 4.75 6 5.19772 6 5.75V7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Challenge Completion",
    description: "Earn 80-100 points for each challenge you complete successfully."
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12L14 14M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Daily Streaks",
    description: "Keep your streak going to earn bonus points and multipliers."
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Level Up",
    description: "Higher levels mean more points per challenge completion."
  }
];

const redemptionRules = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Minimum Redemption",
    description: "Redeem a minimum of 3,000 points for ₹200."
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Redemption Limit",
    description: "Maximum 3,000 points can be redeemed at once."
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 14L4 9M4 9L9 4M4 9H17C18.6569 9 20 10.3431 20 12C20 13.6569 18.6569 15 17 15H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Processing Time",
    description: "Rewards are processed within 24-48 hours."
  }
];

export default function RewardsPage() {
  const currentUser = useSelector(selectCurrentUser);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRewardHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await rewardApi.getHistory();
        
        if (response.success) {
          setRewardHistory(response.data);
        } else {
          throw new Error(response?.response?.data?.message || 'Failed to load reward history');
        }
      } catch (err) {
        console.error('Reward History Load Error:', err);
        setError('Failed to load reward history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardHistory();
  }, []);

  const handleRedeem = async () => {
    try {
      const response = await rewardApi.redeem(3000); // Fixed amount of 3000 points
      if (response.success) {
        // Refresh reward history
        const historyResponse = await rewardApi.getHistory();
        if (historyResponse.success) {
          setRewardHistory(historyResponse.data);
        }
        // Show success message
        toast.success('Points redeemed successfully! You will receive ₹200 within 24-48 hours.');
      } else {
        throw new Error(response?.response?.data?.message || 'Failed to redeem points');
      }
    } catch (err) {
      console.error('Redemption Error:', err);
      toast.error(err.message || 'Failed to redeem points');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium mb-4">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Instant UPI Rewards for Your Achievements!
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Turn Your Growth Into Money
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Complete challenges, earn points, and get instant rewards via UPI. Your personal growth journey now comes with real benefits!
        </p>
      </div>

      {/* Current Points Card */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8">
          <svg className="w-32 h-32 text-white/10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
          </svg>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 relative">
          <div className="text-center sm:text-left">
            <div className="flex items-center mb-2">
              <h2 className="text-xl sm:text-2xl font-semibold">Your Current Points</h2>
              <div className="ml-3 px-2 py-1 bg-white/20 rounded-full text-xs">
                Ready to Redeem
              </div>
            </div>
            <div className="flex items-baseline justify-center sm:justify-start space-x-2">
              <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {currentUser?.currentPoints || 0}
              </span>
              <span className="text-sm sm:text-base text-purple-200">points</span>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={handleRedeem}
              disabled={!currentUser?.currentPoints || currentUser?.currentPoints < 3000}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-purple-600 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium
                transition-all duration-200 transform hover:scale-105 active:scale-100
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Redeem via UPI
            </button>
            {currentUser?.currentPoints < 3000 && (
              <div className="mt-2 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-purple-200">
                  Keep going! Almost there
                </p>
                <p className="text-xs text-purple-200/80">
                  Complete more challenges to unlock rewards
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Earning Rules */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How to Earn Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {rewardRules.map((rule, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100
                transition-all duration-200 hover:shadow-md"
            >
              <div className="text-purple-500 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8">{rule.icon}</div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">{rule.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption Rules */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Redemption Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {redemptionRules.map((rule, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100
                transition-all duration-200 hover:shadow-md"
            >
              <div className="text-purple-500 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8">{rule.icon}</div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">{rule.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reward History */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Reward History</h2>
        {isLoading ? (
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 sm:h-20 bg-gray-100 rounded-lg sm:rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-red-600">{error}</p>
          </div>
        ) : rewardHistory.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg sm:rounded-xl">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12H15M12 9V15M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm sm:text-base text-gray-600">No rewards redeemed yet</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {rewardHistory.map((reward) => (
              <div 
                key={reward.id}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 
                  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {reward.pointsRewarded} Points Redeemed
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      ₹{(reward.pointsRewarded / 3000 * 200).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Redeemed on {new Date(reward.rewardedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="self-start sm:self-auto">
                  <span className={`inline-flex px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                    ${reward.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800'
                      : reward.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reward.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
