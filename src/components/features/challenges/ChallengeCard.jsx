import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllCategories } from '../../../store/slices/categorySlice';

const levelConfig = {
  1: {
    name: 'Beginner',
    color: 'text-emerald-600 bg-emerald-50 ring-emerald-500/10',
  },
  2: {
    name: 'Intermediate',
    color: 'text-amber-600 bg-amber-50 ring-amber-500/10',
  },
  3: {
    name: 'Advanced',
    color: 'text-rose-600 bg-rose-50 ring-rose-500/10',
  }
};

const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
};

export default function ChallengeCard({ challenge }) {
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  const category = categories.find(cat => cat.id === challenge.category);
  const level = levelConfig[challenge.level] || levelConfig[1];

  const handleClick = () => {
    navigate(`/challenges/${challenge.id}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl transition-all duration-300
      hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
      <div className="p-6">
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${categoryStyles[category?.id]?.base || categoryStyles[7].base}
            `}>
              {category?.name || 'General'}
            </span>
          </div>
          <span className={`
            inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
            ring-1 ring-inset ${level.color}
          `}>
            {level.name}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
            {challenge.title}
          </h3>
          <p className="text-gray-600 line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Challenge Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {/* Time */}
            <div className="flex items-center text-gray-500">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">{formatTime(challenge.time)}</span>
            </div>

            {/* Points */}
            <div className="flex items-center text-amber-600">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L14.0357 8.16153L19.5 8.5L15.5 12.1667L16.5 17.5L12 14.6667L7.5 17.5L8.5 12.1667L4.5 8.5L9.96429 8.16153L12 3Z" 
                  fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold">{challenge.points}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleClick}
            className="relative inline-flex items-center justify-center text-sm font-semibold
              text-white px-6 py-2 rounded-lg overflow-hidden
              transition-all duration-300 ease-out
              bg-gradient-to-r from-indigo-500 to-purple-500
              hover:from-indigo-600 hover:to-purple-600
              focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
              transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View Details
            <svg className="w-4 h-4 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const categoryStyles = {
  0: { // All
    base: 'bg-gradient-to-r from-[#2DD4BF] to-[#0EA5E9] text-white',
  },
  1: { // Physical Wellness
    base: 'bg-gradient-to-r from-[#F87171] to-[#EC4899] text-white',
  },
  2: { // Mental Fitness
    base: 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white',
  },
  3: { // Social Impact
    base: 'bg-gradient-to-r from-[#34D399] to-[#059669] text-white',
  },
  4: { // Skill Development
    base: 'bg-gradient-to-r from-[#FB923C] to-[#DB2777] text-white',
  },
  5: { // Financial Wellness
    base: 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-white',
  },
  6: { // Personal Growth
    base: 'bg-gradient-to-r from-[#A78BFA] to-[#EC4899] text-white',
  },
  7: { // Others
    base: 'bg-gradient-to-r from-[#64748B] to-[#475569] text-white',
  }
};