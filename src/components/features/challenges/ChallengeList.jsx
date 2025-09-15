import ChallengeCard from './ChallengeCard';

// Temporary mock data - will be replaced with actual API data later
const mockChallenges = [
  {
    id: 1,
    title: '30-Minute Morning Workout',
    description: 'Complete a 30-minute workout including cardio and basic strength training. Share a timelapse or post-workout photo.',
    category: 'Physical Wellness',
    points: 20,
    bonusPoints: 10, // bonus for early morning completion
    difficulty: 'Beginner',
    estimatedTime: 30,
    proofType: 'Photo/Video',
  },
  {
    id: 2,
    title: '10-Minute Mindful Meditation',
    description: 'Practice mindfulness meditation focusing on breath awareness. Share your experience and insights.',
    category: 'Mental Fitness',
    points: 15,
    difficulty: 'Beginner',
    estimatedTime: 10,
    proofType: 'Text Reflection',
  },
  {
    id: 3,
    title: 'Learn a New Skill',
    description: 'Spend 45 minutes learning something new on your chosen online platform. Share your progress or completion certificate.',
    category: 'Skill Development',
    points: 25,
    difficulty: 'Intermediate',
    estimatedTime: 45,
    proofType: 'Screenshot',
  },
  {
    id: 4,
    title: 'Budget Planning',
    description: 'Create a monthly budget plan using our template. Track your expenses for the day.',
    category: 'Financial Wellness',
    points: 20,
    difficulty: 'Intermediate',
    estimatedTime: 20,
    proofType: 'Screenshot',
  },
];

export default function ChallengeList() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Featured Challenge</h2>
        <div className="mt-4">
          <ChallengeCard challenge={mockChallenges[0]} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Available Challenges</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChallenges.slice(1).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
