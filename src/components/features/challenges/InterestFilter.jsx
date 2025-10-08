import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories, selectAllCategories } from '../../../store/slices/categorySlice';

const categoryIcons = {
  'All': '🎯',
  'Physical Wellness': '💪',
  'Mental Fitness': '🧠',
  'Social Impact': '🤝',
  'Skill Development': '📚',
  'Financial Wellness': '💰',
  'Personal Growth': '🌱',
  'Others': '✨'
};

// Modern gradient color combinations by category ID
const categoryStyles = {
  0: {
    base: 'bg-gradient-to-r from-[#2DD4BF] to-[#0EA5E9]',
    light: 'bg-gradient-to-r from-teal-50 to-sky-50',
    border: 'hover:border-teal-200',
    shadow: 'shadow-teal-500/25',
    text: 'text-teal-700'
  },
  1: {
    base: 'bg-gradient-to-r from-[#F87171] to-[#EC4899]',
    light: 'bg-gradient-to-r from-red-50 to-pink-50',
    border: 'hover:border-red-200',
    shadow: 'shadow-red-500/25',
    text: 'text-red-700'
  },
  2: {
    base: 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]',
    light: 'bg-gradient-to-r from-violet-50 to-indigo-50',
    border: 'hover:border-violet-200',
    shadow: 'shadow-violet-500/25',
    text: 'text-violet-700'
  },
  3: {
    base: 'bg-gradient-to-r from-[#34D399] to-[#059669]',
    light: 'bg-gradient-to-r from-emerald-50 to-green-50',
    border: 'hover:border-emerald-200',
    shadow: 'shadow-emerald-500/25',
    text: 'text-emerald-700'
  },
  4: {
    base: 'bg-gradient-to-r from-[#FB923C] to-[#DB2777]',
    light: 'bg-gradient-to-r from-orange-50 to-pink-50',
    border: 'hover:border-orange-200',
    shadow: 'shadow-orange-500/25',
    text: 'text-orange-700'
  },
  5: {
    base: 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8]',
    light: 'bg-gradient-to-r from-sky-50 to-indigo-50',
    border: 'hover:border-sky-200',
    shadow: 'shadow-sky-500/25',
    text: 'text-sky-700'
  },
  6: {
    base: 'bg-gradient-to-r from-[#A78BFA] to-[#EC4899]',
    light: 'bg-gradient-to-r from-purple-50 to-pink-50',
    border: 'hover:border-purple-200',
    shadow: 'shadow-purple-500/25',
    text: 'text-purple-700'
  },
  7: {
    base: 'bg-gradient-to-r from-[#64748B] to-[#475569]',
    light: 'bg-gradient-to-r from-slate-50 to-gray-50',
    border: 'hover:border-slate-200',
    shadow: 'shadow-slate-500/25',
    text: 'text-slate-700'
  }
};

export default function InterestFilter({ onFilterChange, challengesByInterest }) {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedInterests, setSelectedInterests] = useState(() => {
    const params = searchParams.get('interests');
    return new Set(params ? params.split(',').map(Number) : [0]);
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  
  const availableCategories = [
    { id: 0, name: 'All' },
    ...allCategories.filter(category => challengesByInterest.hasOwnProperty(category.id)),
    {id: -1, name: 'Others'}
  ];

  const toggleCategory = (categoryId) => {
    const newSelected = new Set();
    
    if (categoryId === 0) {
      if (!selectedInterests.has(0)) {
        newSelected.add(0);
      }
    } else {
      selectedInterests.forEach(id => {
        if (id !== 0) newSelected.add(id);
      });
      
      if (selectedInterests.has(categoryId)) {
        newSelected.delete(categoryId);
        if (newSelected.size === 0) {
          newSelected.add(0);
        }
      } else {
        newSelected.add(categoryId);
      }
    }

    setSelectedInterests(newSelected);
    const filteredCategories = Array.from(newSelected).filter(id => id !== 0);
    
    // Update URL with selected interests
    if (filteredCategories.length > 0) {
      setSearchParams({ interests: filteredCategories.join(',') });
    } else {
      setSearchParams({});
    }
    
    onFilterChange(filteredCategories);
  };

  const getCategoryStyle = (category) => {
    const id = Number(category.id);
    return categoryStyles[id] || categoryStyles[7];
  };

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Filter by Interest</h2>
        </div>
        {selectedInterests.size > 0 && !selectedInterests.has(0) && (
          <button
              onClick={() => {
                setSelectedInterests(new Set([0]));
                // Clear interests from URL
                setSearchParams({});
                onFilterChange([]);
              }}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium
              rounded-lg transition-all duration-200 ease-out
              bg-white/80 backdrop-blur-sm border border-gray-200 
              hover:border-red-200 hover:bg-red-50/80
              text-gray-700 hover:text-red-600
              shadow-sm hover:shadow"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
        {availableCategories.map((category) => {
          const isSelected = selectedInterests.has(category.id);
          const style = getCategoryStyle(category);
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`
                group flex items-center space-x-2 shrink-0 px-4 py-2 rounded-xl
                transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
                ${isSelected 
                  ? `${style.base} text-white ${style.shadow} shadow-md`
                  : `${style.light} shadow-sm hover:shadow border border-transparent ${style.border}`
                }
              `}
            >
              <span className={`text-sm font-medium whitespace-nowrap ${
                isSelected ? 'text-white' : style.text
              }`}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}