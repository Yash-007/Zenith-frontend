import { useState, useEffect } from 'react';
import { challengeApi, categoryApi } from '../services/api';

export function useChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [featuredChallenge, setFeaturedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await challengeApi.getAllChallenges();
      if (response.success && response.data) {
        setChallenges(response.data);
        // Select a random challenge as featured
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setFeaturedChallenge(response.data[randomIndex]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  };

  const filterChallengesByCategories = (categoryIds) => {
    if (!categoryIds.length) return challenges;
    return challenges.filter(challenge => categoryIds.includes(challenge.categoryId));
  };

  return {
    challenges,
    featuredChallenge,
    loading,
    error,
    filterChallengesByCategories,
    refreshChallenges: fetchChallenges,
  };
}
