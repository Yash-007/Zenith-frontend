import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  0: { // All
    base: 'bg-gradient-to-r from-blue-500 to-purple-500',
    border: 'hover:border-blue-200',
    shadow: 'shadow-blue-500/25',
  },
  1: { // Physical Wellness
    base: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    border: 'hover:border-blue-200',
    shadow: 'shadow-blue-500/25',
  },
  2: { // Mental Fitness
    base: 'bg-gradient-to-r from-violet-500 to-purple-500',
    border: 'hover:border-violet-200',
    shadow: 'shadow-violet-500/25',
  },
  3: { // Social Impact
    base: 'bg-gradient-to-r from-emerald-400 to-green-500',
    border: 'hover:border-emerald-200',
    shadow: 'shadow-emerald-500/25',
  },
  4: { // Skill Development
    base: 'bg-gradient-to-r from-orange-400 to-pink-500',
    border: 'hover:border-orange-200',
    shadow: 'shadow-orange-500/25',
  },
  5: { // Financial Wellness
    base: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    border: 'hover:border-cyan-200',
    shadow: 'shadow-cyan-500/25',
  },
  6: { // Personal Growth
    base: 'bg-gradient-to-r from-rose-400 to-pink-500',
    border: 'hover:border-rose-200',
    shadow: 'shadow-rose-500/25',
  },
  7: { // Others
    base: 'bg-gradient-to-r from-gray-500 to-slate-600',
    border: 'hover:border-gray-200',
    shadow: 'shadow-gray-500/25',
  }
};

export default function InterestFilter({ onFilterChange, challengesByInterest }) {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const [selectedInterests, setSelectedInterests] = useState(new Set(['all']));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const availableCategories = [
    { id: 'all', name: 'All' },
    ...allCategories.filter(category => challengesByInterest.hasOwnProperty(category.id))
  ];

  const toggleCategory = (categoryId) => {
    const newSelected = new Set();
    
    if (categoryId === 'all') {
      if (!selectedInterests.has('all')) {
        newSelected.add('all');
      }
    } else {
      selectedInterests.forEach(id => {
        if (id !== 'all') newSelected.add(id);
      });
      
      if (selectedInterests.has(categoryId)) {
        newSelected.delete(categoryId);
        if (newSelected.size === 0) {
          newSelected.add('all');
        }
      } else {
        newSelected.add(categoryId);
      }
    }

    setSelectedInterests(newSelected);
    const filteredCategories = Array.from(newSelected).filter(id => id !== 'all');
    onFilterChange(filteredCategories);
  };

  const getCategoryStyle = (category) => {
    const id = category.id === 'all' ? 0 : Number(category.id);
    return categoryStyles[id] || categoryStyles[7]; // Default to Others style if ID not found
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Explore Challenges</h2>
        {selectedInterests.size > 0 && !selectedInterests.has('all') && (
          <button
            onClick={() => {
              setSelectedInterests(new Set(['all']));
              onFilterChange([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {availableCategories.map((category) => {
          const isSelected = selectedInterests.has(category.id);
          const style = getCategoryStyle(category);
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl 
                transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
                ${isSelected 
                  ? `${style.base} text-white ${style.shadow}`
                  : `bg-white border-2 border-gray-100 ${style.border}`
                }
              `}
            >
              <div className={`
                w-12 h-12 flex items-center justify-center rounded-full mb-3
                ${isSelected ? 'bg-white/20' : 'bg-gray-50'}
                transition-colors duration-300
              `}>
                <span className="text-2xl">{categoryIcons[category.name] || '📋'}</span>
              </div>
              <span className={`text-sm font-medium ${
                isSelected ? 'text-white' : 'text-gray-700'
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