import { useState, useEffect } from 'react';
import { chatApi } from '../../services/api';
import toast from 'react-hot-toast';
import ChatBot from '../../components/features/coach/ChatBot';
import Blogs from '../../components/features/coach/Blogs';

const tabs = [
  { id: 'chat', name: 'AI Coach', icon: '🤖' },
  { id: 'blogs', name: 'Growth Library', icon: '📚' }
];

export default function CoachPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoadingChat, setIsLoadingChat] = useState(true);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await chatApi.getChatHistory();
        if (response.success && response.data.length > 0) {
          const formattedMessages = response.data.map(chat => ([
            { type: 'user', content: chat.query },
            { type: 'bot', content: chat.response }
          ])).flat();
          setChatHistory(formattedMessages);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
        toast.error('Failed to load chat history');
      } finally {
        setIsLoadingChat(false);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Your Personal Growth Assistant
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6">
          Get personalized guidance, track your progress, and explore curated resources to accelerate your growth journey.
        </p>
        
        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Ask about:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {/* Platform Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">Platform Features</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Ask about challenges, rewards, points system, and how to use different features
            </p>
          </div>

          {/* Progress Tracking */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">Track Progress</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Learn about your achievements, streaks, and areas for improvement
            </p>
          </div>

          {/* Personal Growth */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">Growth Advice</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Get tips on personal development, habit building, and motivation
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="border-b border-gray-100">
          <nav className="flex justify-center" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 sm:flex-none py-3 sm:py-4 px-3 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                  <span className="text-lg sm:text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-6">
          {activeTab === 'chat' ? (
            <ChatBot 
              initialHistory={chatHistory}
              isLoading={isLoadingChat}
              onHistoryUpdate={(newMessages) => setChatHistory(newMessages)}
            />
          ) : (
            <Blogs />
          )}
        </div>
      </div>
    </div>
  );
}
