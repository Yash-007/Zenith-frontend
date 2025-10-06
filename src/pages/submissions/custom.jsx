import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, fetchCurrentUser } from '../../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { challengeApi } from '../../services/api';

export default function CustomSubmissionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    // Clean up old preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));

    // Create new preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Validation
    if (!description.trim()) {
      toast.error('Please describe what you did today');
      return;
    }
    if (description.length < 10) {
      toast.error('Please provide a more detailed description');
      return;
    }
    if (imageFiles.length === 0) {
      toast.error('Please add at least one photo of your achievement');
      return;
    }

    try {
      setIsSubmitting(true);

      // Generate a random UUID for custom challenge
      const customChallengeId = crypto.randomUUID();
      
      const submitData = new FormData();
      submitData.append('userId', currentUser.id);
      submitData.append('challengeId', customChallengeId);
      submitData.append('challengeName', challengeName.trim() || 'Custom Challenge');
      submitData.append('text', description);
      submitData.append('status', 'PENDING');
      submitData.append('isChallengeExists', false);
      
      imageFiles.forEach(file => {
        submitData.append('images', file);
      });

      const response = await challengeApi.submitChallenge(submitData);

      if (response.success) {
        // Refresh user data to update points and stats
        await dispatch(fetchCurrentUser());
        
        toast.success('Custom challenge submitted successfully!');
        navigate('/challenges', { 
          state: { message: 'Your custom challenge has been submitted and is under review.' }
        });
      } else {
        console.error('Submit Challenge Failed:', response);
        throw new Error('Failed to submit challenge');
      }
    } catch (error) {
      const errorMessage = 'Failed to submit challenge';
      toast.error(errorMessage);
      console.error('Submit Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">What did you do today?</h1>
        <p className="text-gray-600">
          Share a step you took today in your self-improvement journey.
        </p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
          <svg className="w-5 h-5 text-primary-500 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.0006 1.25C12.2871 1.25 12.5513 1.41834 12.6712 1.67683L15.6118 7.60941L22.1671 8.53029C22.4507 8.57569 22.6865 8.77027 22.7919 9.03571C22.8973 9.30116 22.8571 9.60189 22.6857 9.83004L18.1742 15.1106L19.3081 21.7089C19.3644 21.9938 19.2721 22.2854 19.0607 22.4813C18.8493 22.6771 18.5526 22.7506 18.2756 22.6771L12.0006 19.8518L5.72568 22.6771C5.44865 22.7506 5.152 22.6771 4.94057 22.4813C4.72915 22.2854 4.63687 21.9938 4.69321 21.7089L5.82711 15.1106L1.31559 9.83004C1.14425 9.60189 1.104 9.30116 1.20939 9.03571C1.31478 8.77027 1.55054 8.57569 1.83414 8.53029L8.38947 7.60941L11.33 1.67683C11.45 1.41834 11.7142 1.25 12.0006 1.25Z" />
          </svg>
          <span className="text-sm font-medium text-primary-700">Earn 100 points upon approval</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            {/* Challenge Name */}
            <div>
              <label htmlFor="challengeName" className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Name (optional)
              </label>
              <input
                id="challengeName"
                type="text"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                placeholder="Name your challenge"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about it <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share what you did today to improve yourself - a new skill, a good habit, or any positive change."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                Note: Both your description and images will be considered during the review process.
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Photos <span className="text-red-600">*</span>
              </label>
              <label
                htmlFor="images"
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg 
                  hover:border-primary-500 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 group-hover:text-primary-500 transition-colors duration-200"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex justify-center text-sm text-gray-600">
                    <span className="font-medium text-primary-600 group-hover:text-primary-500 transition-colors duration-200">
                      Click to upload
                    </span>
                    <span className="pl-1">or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">Required - Upload images to show your achievement</p>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </div>
              </label>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(url);
                          setPreviewUrls(prev => prev.filter((_, i) => i !== index));
                          setImageFiles(prev => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-6 py-3 rounded-xl text-base font-medium text-white
              transition-all duration-200 ease-out
              bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600
              shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]
              ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Challenge'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
