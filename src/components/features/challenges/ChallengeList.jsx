import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';
import InterestFilter from './InterestFilter';
import { 
  fetchUserChallenges,
  selectChallengesByInterest,
  selectPendingChallenge,
  selectChallengesLoading,
  selectChallengesError
} from '../../../store/slices/challengeSlice';
export default function ChallengeList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedInterests, setSelectedInterests] = useState(() => {
    const params = searchParams.get('interests');
    return params ? params.split(',').map(Number) : [];
  });
  const [successMessage, setSuccessMessage] = useState(null);

  // Set and clear success message from location state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  const challengesByInterest = useSelector(selectChallengesByInterest);
  const pendingChallenge = useSelector(selectPendingChallenge);
  const loading = useSelector(selectChallengesLoading);
  const error = useSelector(selectChallengesError);

  useEffect(() => {
    dispatch(fetchUserChallenges());
  }, [dispatch]);

  // Get all challenges for selected interests
  const filteredChallenges = selectedInterests.length === 0
    ? Object.values(challengesByInterest).flat()
    : selectedInterests.flatMap(id => challengesByInterest[id] || []);

  // Get a random challenge as featured
  const getRandomChallenge = (challenges) => {
    if (!challenges.length) return null;
    // const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[0];
  };

  const featuredChallenge = getRandomChallenge(filteredChallenges);

  // Remove featured challenge from available list
  const availableChallenges = featuredChallenge 
    ? filteredChallenges.filter(challenge => challenge.id !== featuredChallenge.id)
    : filteredChallenges;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-xl"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-600">Something went wrong!</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {successMessage && (
        <div className="bg-green-50 border border-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center animate-fade-in">
          <div className="flex-shrink-0">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-green-800">
            {successMessage}
          </p>
        </div>
      )}

      <InterestFilter 
        onFilterChange={setSelectedInterests}
        challengesByInterest={challengesByInterest}
      />

      {featuredChallenge && (
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Featured Challenge</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Complete this challenge to earn bonus points!</p>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <ChallengeCard challenge={featuredChallenge} />
          </div>  
        </div>
      )}

      <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Available Challenges</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Choose from our curated list of challenges</p>
          </div>
          <div className="flex items-start">
            <div className="w-full sm:max-w-xs sm:text-right">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Can't find a suitable challenge? Share what meaningful you've done today!
              </p>
              <button
                onClick={() => navigate('/submissions/custom')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                  text-sm font-medium transition-all duration-200 ease-out
                  bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600
                  text-white shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Submit Custom Challenge
              </button>
            </div>
          </div>
        </div>
        
        {availableChallenges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {availableChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-gray-600">No challenges found for selected interests.</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Try selecting different interests or check back later!</p>
          </div>
        )}
      </div>

      {pendingChallenge && (
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm p-4 sm:p-6 border-l-4 border-blue-400">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Challenge Under Review</h2>
            <span className="self-start sm:self-auto px-2.5 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
              Under Review
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Your submission is being reviewed by our team. We'll update you once it's approved!</p>
          <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <ChallengeCard challenge={pendingChallenge} />
          </div>
        </div>
      )}
    </div>
  );
}
