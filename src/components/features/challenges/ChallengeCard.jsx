import { ClockIcon, SparklesIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Card from '../../common/Card';
import Button from '../../common/Button';

const categoryColors = {
  'Physical Wellness': 'bg-blue-100 text-blue-800',
  'Mental Fitness': 'bg-purple-100 text-purple-800',
  'Social Impact': 'bg-green-100 text-green-800',
  'Skill Development': 'bg-orange-100 text-orange-800',
  'Financial Wellness': 'bg-emerald-100 text-emerald-800',
  'Personal Growth': 'bg-rose-100 text-rose-800',
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
};

export default function ChallengeCard({ challenge }) {
  const {
    title,
    description,
    category,
    points,
    difficulty,
    estimatedTime,
    proofType,
    bonusPoints,
  } = challenge;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category]}`}>
              {category}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mt-2">{title}</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {points} points
            </span>
            {bonusPoints && (
              <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                <SparklesIcon className="h-3 w-3 mr-1" />
                +{bonusPoints} bonus
              </span>
            )}
          </div>
        </div>

        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {estimatedTime} min
          </div>
          <div className="flex items-center">
            <PhotoIcon className="h-4 w-4 mr-1" />
            {proofType}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button variant="primary" className="w-full">
          Accept Challenge
        </Button>
      </div>
    </Card>
  );
}
