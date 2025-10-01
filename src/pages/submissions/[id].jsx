import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { submissionApi } from '../../services/api';
import { useSelector } from 'react-redux';
import { selectAllCategories } from '../../store/slices/categorySlice';

const levelMap = {
  0: { name: 'Beginner', icon: '🌱', color: 'bg-green-100 text-green-800' },
  1: { name: 'Intermediate', icon: '⭐', color: 'bg-yellow-100 text-yellow-800' },
  2: { name: 'Advanced', icon: '🔥', color: 'bg-red-100 text-red-800' }
};

const statusMap = {
  'PENDING': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  'COMPLETED': { label: 'Completed', color: 'bg-green-100 text-green-800' },
  'REJECTED': { label: 'Rejected', color: 'bg-red-100 text-red-800' }
};

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // For now using dummy data
        const dummyData = {
          id: "submission_123",
          userId: "user_123",
          isChallengeExists: true, // Try changing to false to see different view
          challengeId: "challenge_123",
          status: "PENDING", // Try: PENDING, COMPLETED, REJECTED
          proofs: {
            text: "Today I focused on improving my coding skills by completing a challenging algorithm problem. I broke down the problem into smaller steps, implemented each part carefully, and tested thoroughly. This helped me better understand dynamic programming concepts.",
            images: [
              "https://picsum.photos/400/400",
              "https://picsum.photos/401/400",
              "https://picsum.photos/402/400"
            ]
          },
          submittedAt: "2025-03-15T10:00:00Z",
          challengeDetails: {
            id: "challenge_123",
            title: "Master Dynamic Programming",
            description: "Solve complex algorithmic problems using dynamic programming approach",
            category: 1,
            time: 60,
            points: 150,
            level: 2
          }
        };
        
        setSubmission(dummyData);
      } catch (err) {
        console.error('Submission Load Error:', err);
        setError(err?.message || 'Failed to load submission details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSubmissionDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Go Back
        </button>
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-red-600 mb-2">Failed to load submission</p>
          <p className="text-gray-600">{error || 'Submission not found'}</p>
        </div>
      </div>
    );
  }

  const { status, proofs, submittedAt, isChallengeExists, challengeDetails } = submission;
  const category = isChallengeExists ? categories.find(cat => cat.id === challengeDetails.category) : null;
  const levelInfo = isChallengeExists ? levelMap[challengeDetails.level] : null;
  const statusInfo = statusMap[status];
  const submissionDate = new Date(submittedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Go Back
      </button>

      {/* Status Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {isChallengeExists ? (
                <>
                  <span className="text-gray-600 font-normal">Challenge:</span> {challengeDetails.title}
                </>
              ) : (
                'Custom Submission'
              )}
            </h1>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Submitted on {submissionDate}
        </p>
      </div>

      {/* Submission Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Submission Details</h2>
        
        {/* Text Response */}
        {proofs.text && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{proofs.text}</p>
            </div>
          </div>
        )}

        {/* Images */}
        {proofs.images?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {proofs.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Submission ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejection Message */}
        {status === 'REJECTED' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Submission Rejected</h3>
            <p className="text-red-700">
              Your submission was not approved. You can submit the challenge again with the required changes.
            </p>
            {isChallengeExists && (
              <button
                onClick={() => navigate(`/challenges/${challengeDetails.id}`)}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg
                  text-sm font-medium transition-all duration-200 ease-out
                  bg-red-100 text-red-700 hover:bg-red-200"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
