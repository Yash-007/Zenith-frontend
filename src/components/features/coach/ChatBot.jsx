import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/slices/authSlice';
import { chatApi } from '../../../services/api';
import toast from 'react-hot-toast';

export default function ChatBot() {
  const currentUser = useSelector(selectCurrentUser);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `Hi ${currentUser?.name || 'there'}! I'm your AI growth coach. I can help you with:
      • Understanding platform features
      • Tracking your progress
      • Personal growth advice
      
      What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await chatApi.getChatHistory();
        if (response.success && response.data.length > 0) {
          const formattedMessages = response.data.map(chat => ([
            { type: 'user', content: chat.query },
            { type: 'bot', content: chat.response }
          ])).flat();
          
          setMessages(prev => [prev[0], ...formattedMessages]); // Keep welcome message at top
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
        toast.error('Failed to load chat history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll on new messages, not on initial load
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    
    // Add user message
    const userMessage = { type: 'user', content: userQuery };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatApi.sendQuery(userQuery);
      
      if (response.success) {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: response.data.response
        }]);
      } else {
        throw new Error(response.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again."
      }]);
      toast.error('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] sm:h-[600px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="flex space-x-1.5 sm:space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Loading chat history...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100
                    flex items-center justify-center mr-1.5 sm:mr-2">
                    <span role="img" aria-label="AI Coach" className="text-base sm:text-lg">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 ${
                    message.type === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500
                    flex items-center justify-center ml-1.5 sm:ml-2">
                    <span className="text-white font-medium text-sm sm:text-base">
                      {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100
                  flex items-center justify-center mr-1.5 sm:mr-2">
                  <span role="img" aria-label="AI Coach" className="text-base sm:text-lg">🤖</span>
                </div>
                <div className="bg-purple-100 rounded-lg sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your growth journey..."
          disabled={isLoading}
          className="flex-1 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-sm sm:text-base border border-gray-300 
            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping || isLoading}
          className="px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium whitespace-nowrap
            transition-all duration-200 ease-out
            bg-purple-500 hover:bg-purple-600
            text-white shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isTyping ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
