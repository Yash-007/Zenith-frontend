import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || null);

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
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
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
    <div className="space-y-8">
      {successMessage && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center animate-fade-in">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="ml-3 text-sm font-medium text-green-800">
            {successMessage}
          </p>
        </div>
      )}

      <InterestFilter 
        onFilterChange={setSelectedInterests}
        challengesByInterest={challengesByInterest}
      />

      {featuredChallenge && (
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Challenge</h2>
          <p className="text-gray-600 mb-4">Complete this challenge to earn bonus points!</p>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
            <ChallengeCard challenge={featuredChallenge} />
          </div>  
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Challenges</h2>
            <p className="text-gray-600 mt-1">Choose from our curated list of challenges</p>
          </div>
          {/* Add sorting options here later */}
        </div>
        
        {availableChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No challenges found for selected interests.</p>
            <p className="text-sm text-gray-500 mt-2">Try selecting different interests or check back later!</p>
          </div>
        )}
      </div>

      {pendingChallenge && (
        <div className="bg-white rounded-2xl shadow-soft p-6 border-l-4 border-blue-400">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Challenge Under Review</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Under Review
            </span>
          </div>
          <p className="text-gray-600 mb-4">Your submission is being reviewed by our team. We'll update you once it's approved!</p>
          <div className="bg-blue-50 rounded-xl p-4">
            <ChallengeCard challenge={pendingChallenge} />
          </div>
        </div>
      )}
    </div>
  );
}
