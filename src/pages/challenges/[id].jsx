import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftIcon, ClockIcon, SparklesIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { selectAllCategories } from '../../store/slices/categorySlice';
import { selectCurrentUser, fetchCurrentUser } from '../../store/slices/authSlice';
import { challengeApi } from '../../services/api';

const levelMap = {
  0: { 
    name: 'Beginner', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ), 
    color: 'bg-green-100 text-green-800', 
    description: 'Perfect for those just starting out' 
  },
  1: { 
    name: 'Intermediate', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ), 
    color: 'bg-yellow-100 text-yellow-800', 
    description: 'For those with some experience' 
  },
  2: { 
    name: 'Advanced', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ), 
    color: 'bg-red-100 text-red-800', 
    description: 'Challenging tasks for experienced users' 
  }
};

const submissionTypeMap = {
  'TEXT': { 
    name: 'Share Your Story', 
    icon: '📝', 
    description: 'Tell us about your experience',
    note: 'Your insights can inspire others!',
    placeholder: '• How did you approach it?\n• What did you learn?\n• What are you proud of?\n• What would you do differently?\n\nFeel free to share anything else - your journey matters!'
  },
  'IMAGE': { 
    name: 'Add Photos', 
    icon: '📸', 
    description: 'Show your achievement',
    note: 'A picture is worth a thousand words!',
    requirements: 'JPG/PNG/GIF, max 5MB each',
    examples: 'Show us your progress - workout, new skill, or proud moment!'
  }
};

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const currentUser = useSelector(selectCurrentUser);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    images: []
  });
  const [previewUrls, setPreviewUrls] = useState([]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);
  const [error, setError] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoadError('Invalid challenge ID');
      setIsLoading(false);
      return;
    }

    const fetchChallenge = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const response = await challengeApi.getChallenge(id);
        if (response.success) {
          setChallenge(response.data);
        } else {
          const errorMessage = response?.response?.data?.message || 'Failed to load challenge';
          console.log('Challenge Load Error:', { response });
          setLoadError(errorMessage);
        }
      } catch (err) {
        console.error('Challenge Load Error:', err);
        const errorMessage = err.response?.data?.message 
          || err.response?.data?.error 
          || err.message 
          || 'Failed to load challenge';
        setLoadError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
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

  if (loadError || !challenge) {
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
          <p className="text-xl font-semibold text-red-600 mb-2">Failed to load challenge</p>
          <p className="text-gray-600">{loadError || 'Challenge not found'}</p>
        </div>
      </div>
    );
  }

  console.log('challenge', challenge);
  console.log('categories', categories);
  const category = categories.find(cat => cat.id === challenge.category);
  const levelInfo = levelMap[challenge.level] || levelMap[1];
//   const submissionInfo = submissionTypeMap[challenge.submissionType] || submissionTypeMap['TEXT'];

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

      {/* Challenge Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{challenge.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{challenge.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              <SparklesIcon className="h-5 w-5 mr-1.5" />
              {challenge.points} points
            </div>
          </div>
        </div>

        {/* Challenge Meta */}
        <div className="flex flex-wrap gap-4 mt-6">
          {/* Category */}
          <div className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800">
            <span className="font-medium">{category?.name || 'General'}</span>
          </div>

          {/* Time */}
          <div className="flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800">
            <ClockIcon className="h-5 w-5 mr-1.5" />
            <span className="font-medium">{challenge.time} minutes</span>
          </div>

          {/* Level */}
          <div className={`flex items-center px-3 py-1.5 rounded-lg ${levelInfo.color}`}>
            <span className="text-lg mr-2">{levelInfo.icon}</span>
            <span className="font-medium">{levelInfo.name}</span>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="prose prose-indigo max-w-none">
          {/* Challenge Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Challenge Details</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 leading-relaxed">{challenge.longDescription}</p>
            </div>
          </div>

          {/* Submission Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Below</h2>
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Text Submission */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    {submissionTypeMap.TEXT.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{submissionTypeMap.TEXT.name}</h3>
                    <p className="text-gray-600 text-sm">{submissionTypeMap.TEXT.description}</p>
                  </div>
                </div>

                {/* Image Submission */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    {submissionTypeMap.IMAGE.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{submissionTypeMap.IMAGE.name}</h3>
                    <p className="text-gray-600 text-sm">{submissionTypeMap.IMAGE.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Challenge Level</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${levelInfo.color}`}>
                  {levelInfo.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{levelInfo.name}</h3>
                  <p className="text-gray-600 text-sm">{levelInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Submission Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {challenge.isSubmitted ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900">Challenge Submitted</h2>
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                challenge.submissionStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                challenge.submissionStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.submissionStatus === 'COMPLETED' ? 'Completed' :
                 challenge.submissionStatus === 'PENDING' ? 'Under Review' :
                 'Rejected'}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/submissions/${challenge.submissionId}`)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg
                  text-sm font-medium transition-all duration-200 ease-out
                  bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                  text-white shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
              >
                View Submission
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Challenge</h2>
            <form onSubmit={async (e) => {
          e.preventDefault();
          setError(null);

          // Validate text submission
          if (!formData.description || !formData.description.trim()) {
            setError('Please share your experience with this challenge.');
            return;
          }

          // Validate text length
          if (formData.description.trim().length < 10) {
            setError('Please provide a more detailed description of your experience.');
            return;
          }

          // Validate images
          if (!formData.images || formData.images.length === 0) {
            setError('Please add at least one photo to capture your progress.');
            return;
          }

          // Validate image count
          if (formData.images.length > 5) {
            setError('You can upload a maximum of 5 images.');
            return;
          }
          
          setError(null);
          setIsSubmitting(true);
          
          if (!currentUser?.id) {
            toast.error('User not found. Please try logging in again.');
            setIsSubmitting(false);
            return;
          }

          try {
            const submitData = new FormData();
            submitData.append('userId', currentUser.id);
            submitData.append('challengeId', id);
            submitData.append('status', 'PENDING');
            submitData.append('isChallengeExists', 'true');
            
            // Optional fields
            if (formData.description.trim()) {
              submitData.append('text', formData.description.trim());
            }
            
            // Append images if any (max 5)
            formData.images.slice(0, 5).forEach(image => {
              submitData.append('images', image);
            });

            const response = await challengeApi.submitChallenge(submitData);
            
            if (response.success) {
              try {
                // Fetch updated user data (for streaks, points, etc.)
                await dispatch(fetchCurrentUser());
              } catch (error) {
                console.error('Error fetching updated user data:', error);
                // Continue with navigation even if user data fetch fails
              }
              
              toast.success('Challenge submitted successfully! Our team will review it shortly.');
              navigate('/challenges');
            } else {
              const errorMessage = response.message || 'Failed to submit challenge';
              console.error('Submit Challenge Failed:', response);
              toast.error(errorMessage);
              setIsSubmitting(false);
            }
          } catch (error) {
            console.error('Submit Challenge Error:', error);
            const errorMessage = error.response?.data?.message 
              || error.response?.data?.error 
              || error.message 
              || 'Failed to submit challenge';
            toast.error(errorMessage);
            setIsSubmitting(false);
          }
        }}>
          {/* Text Description */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
                {submissionTypeMap.TEXT.icon} <span className="ml-2">{submissionTypeMap.TEXT.name}</span>
              </h3>
              <p className="text-gray-600">{submissionTypeMap.TEXT.description}</p>
              <div className="mt-2 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  {submissionTypeMap.TEXT.note}
                </p>
              </div>
            </div>
            <textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={submissionTypeMap.TEXT.placeholder}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-100 placeholder:text-gray-400 placeholder:text-sm"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
                {submissionTypeMap.IMAGE.icon} <span className="ml-2">{submissionTypeMap.IMAGE.name}</span>
              </h3>
              <p className="text-gray-600">{submissionTypeMap.IMAGE.description}</p>
              <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  {submissionTypeMap.IMAGE.note} {submissionTypeMap.IMAGE.examples}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* Image Previews */}
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group">
                  <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter((_, i) => i !== index);
                      const newPreviews = previewUrls.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, images: newImages }));
                      setPreviewUrls(newPreviews);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              {previewUrls.length < 4 && (
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-400 transition-colors">
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-purple-600">
                    <PhotoIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add Photo</span>
                    <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            setError('Image size should not exceed 5MB');
                            return;
                          }
                          const url = URL.createObjectURL(file);
                          setPreviewUrls(prev => [...prev, url]);
                          setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, file]
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Technical requirements:</span> {submissionTypeMap.IMAGE.requirements}
            </p>
          </div>

          {/* Important Note */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="ml-3 text-sm text-amber-700">
                Both text and photos will be reviewed for challenge completion.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl
                text-base font-medium transition-all duration-200 ease-out
                bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                text-white shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Challenge'}
              {!isSubmitting && (
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
            </form>
          </>
  )}
  </div>
  </div>
  )
}
