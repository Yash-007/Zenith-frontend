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
      if (!id) {
        setError('Invalid submission ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await submissionApi.getSubmissionDetails(id);
        
        if (response.success && response.data) {
          setSubmission({
            ...response.data,
          });
        } else {
          throw new Error(response.message || 'Failed to load submission details');
        }
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
        {isChallengeExists ? (
          <button
            onClick={() => navigate(`/challenges/${submission.challengeId}`)}
            className="w-full text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-gray-600 font-normal">Challenge: </span>
                  <span className="group-hover:text-primary-600 transition-colors duration-200">
                    {submission.challengeName}
                  </span>
                </h1>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Submitted on {submissionDate}
            </p>
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {submission.challengeName || 'Custom Submission'}
                </h1>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Submitted on {submissionDate}
            </p>
          </>
        )}
      </div>

      {/* Submission Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Submission Details</h2>
        
        {/* Text Response */}
        {submission?.proofs?.text && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.proofs.text}</p>
            </div>
          </div>
        )}

        {/* Images */}
        {submission?.proofs?.images?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {submission.proofs.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={`https://zenith-backend-z8ig.onrender.com/${image}`} 
                    alt={`Submission ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTg2IDEzMkgyMTRWMTYwSDE4NlYxMzJaTTE4NiAxODhIMjE0VjI2OEgxODZWMTg4WiIgZmlsbD0iIzk0QTNCOCIvPjwvc3ZnPg==';
                      e.target.classList.add('bg-gray-100');
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviewer Remarks */}
        {submission.remarks && (
          <div className={`mt-8 p-4 rounded-lg ${
            status === 'REJECTED' 
              ? 'bg-red-50 border border-red-100' 
              : status === 'COMPLETED'
              ? 'bg-green-50 border border-green-100'
              : 'bg-yellow-50 border border-yellow-100'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              status === 'REJECTED'
                ? 'text-red-800'
                : status === 'COMPLETED'
                ? 'text-green-800'
                : 'text-yellow-800'
            }`}>
              Reviewer's Remarks
            </h3>
            <p className={`whitespace-pre-wrap ${
              status === 'REJECTED'
                ? 'text-red-700'
                : status === 'COMPLETED'
                ? 'text-green-700'
                : 'text-yellow-700'
            }`}>
              {submission.remarks}
            </p>
          </div>
        )}
        
        {/* Default Status Messages when no remarks */}
        {!submission.remarks && (status === 'REJECTED' || status === 'COMPLETED') && (
          <div className={`mt-8 p-4 rounded-lg ${
            status === 'REJECTED' 
              ? 'bg-red-50 border border-red-100'
              : 'bg-green-50 border border-green-100'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              status === 'REJECTED' ? 'text-red-800' : 'text-green-800'
            }`}>
              {status === 'REJECTED' ? 'Submission Rejected' : 'Submission Approved'}
            </h3>
            <p className={status === 'REJECTED' ? 'text-red-700' : 'text-green-700'}>
              {status === 'REJECTED' 
                ? 'Your submission was not approved.'
                : 'Your submission has been approved.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
