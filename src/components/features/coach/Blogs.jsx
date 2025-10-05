import { useState } from 'react';

// Curated blog articles from the internet
const BLOGS = [
  {
    id: 1,
    title: 'The Science of Habit Formation: A Complete Guide',
    category: 'Personal Growth',
    readTime: '12 min',
    excerpt: 'A comprehensive guide to understanding how habits work and how to build better ones, based on scientific research and practical applications.',
    image: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df',
    url: 'https://www.acefitness.org/continuing-education/certified/march-2025/8825/the-science-of-habit-formation-a-guide-for-health-and-exercise-professionals/?srsltid=AfmBOopZ73MvnyLwD5SOVyeUebRd63tKGDTBWgKXS7tvpsM-TBELtMXO'
  },
  {
    id: 2,
    title: 'Growth Mindset: The Science of Getting Better',
    category: 'Mental Fitness',
    readTime: '8 min',
    excerpt: "Learn about Carol Dweck's research on growth mindset and how believing in your ability to improve can lead to greater success.",
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
    url: 'https://fs.blog/carol-dweck-mindset/'
  },
  {
    id: 3,
    title: 'Deep Work: How to Develop the Most Valuable Skill of the 21st Century',
    category: 'Productivity',
    readTime: '15 min',
    excerpt: "Explore Cal Newport's concept of Deep Work and learn how to develop this crucial skill for achieving exceptional results.",
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
    url: 'https://dansilvestre.com/deep-work/'
  },
  {
    id: 4,
    title: 'The Psychology of Self-Improvement',
    category: 'Mental Fitness',
    readTime: '10 min',
    excerpt: 'Understanding the psychological principles behind personal development and how to apply them effectively in your life.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
    url: 'https://achology.com/positive-psychology/the-psychology-of-self-improvement/'
  },
  {
    id: 5,
    title: 'Building Mental Toughness: A Scientific Approach',
    category: 'Mental Fitness',
    readTime: '9 min',
    excerpt: "Research-backed strategies for developing resilience and mental strength to overcome life's challenges.",
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5',
    url: 'https://medium.com/mind-cafe/the-science-of-developing-mental-toughness-in-your-health-work-and-life-2f445e553833'
  },
  {
    id: 6,
    title: 'The Art of Goal Setting: A Strategic Framework',
    category: 'Personal Growth',
    readTime: '11 min',
    excerpt: 'A detailed guide to setting and achieving meaningful goals using the SMART framework and psychological insights.',
    image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b',
    url: 'https://www.getjop.com/blog/goal-setting'
  },
  {
    id: 7,
    title: 'Understanding and Managing Stress: A Comprehensive Guide',
    category: 'Mental Fitness',
    readTime: '13 min',
    excerpt: "Learn about the science of stress and evidence-based techniques for managing it effectively in your daily life.",
    image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6',
    url: 'https://www.helpguide.org/mental-health/stress/stress-management'
  },
  {
    id: 8,
    title: 'The Power of Deliberate Practice',
    category: 'Skill Development',
    readTime: '14 min',
    excerpt: 'Discover how to use deliberate practice to accelerate your learning and master any skill more effectively.',
    image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c',
    url: 'https://curiouslionlearning.com/deliberate-practice/'
  },
  {
    id: 9,
    title: 'Time Management: The Ultimate Guide',
    category: 'Productivity',
    readTime: '16 min',
    excerpt: 'A comprehensive approach to managing your time effectively, including proven techniques and modern strategies.',
    image: 'https://images.unsplash.com/photo-1493689485253-f07fcbfc731b',
    url: 'https://lifeat.io/blog/mastering-time-management-skills-the-ultimate-guide-for-busy-professionals'
  }
];

const categories = [
  'All',
  'Personal Growth',
  'Mental Fitness',
  'Productivity',
  'Skill Development'
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredBlogs = BLOGS.filter(blog => {
    return selectedCategory === 'All' || blog.category === selectedCategory;
  });

  return (
    <div>
      {/* Categories */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200
                ${selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-100
              transition-all duration-200 hover:shadow-md hover:-translate-y-1"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTg2IDEzMkgyMTRWMTYwSDE4NlYxMzJaTTE4NiAxODhIMjE0VjI2OEgxODZWMTg4WiIgZmlsbD0iIzk0QTNCOCIvPjwvc3ZnPg==';
                }}
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-500">
                  {blog.readTime} read
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">
                {blog.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {blog.excerpt}
              </p>
              <button 
                onClick={() => window.open(blog.url, '_blank')}
                className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center"
              >
                Read More
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg text-gray-600">No articles found</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
}
