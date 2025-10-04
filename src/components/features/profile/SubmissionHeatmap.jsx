import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import { submissionApi } from '../../../services/api';

export default function SubmissionHeatmap() {
  const [heatmapData, setHeatmapData] = useState([]);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);

  useEffect(() => {
        const fetchUserSubmissions = async () => {
          try {
            const response = await submissionApi.getUserSubmissions(0);            
            if (response.success) {
              const submissionCounts = response.data.submissions.reduce((acc, submission) => {
                const date = new Date(submission.submittedAt).toISOString().split('T')[0];
                acc[date] = (acc[date] || 0) + 1;
                return acc;
              }, {});
          
              const data = Object.entries(submissionCounts).map(([date, count]) => ({
                date,
                count
              }));
          
              setHeatmapData(data);
            } else {
              throw new Error(response?.response?.data?.message || 'Failed to load submissions');
            }
          } catch (err) {
            console.error('Submissions Load Error:', err);
          }
        };
    
        fetchUserSubmissions();
  }, []);

  const getTooltipDataAttr = (value) => {
    if (!value || !value.count) {
      return { 'data-tooltip-id': 'heatmap-tooltip', 'data-tooltip-content': 'No submissions' };
    }
    return {
      'data-tooltip-id': 'heatmap-tooltip',
      'data-tooltip-content': `${value.count} submission${value.count !== 1 ? 's' : ''} on ${new Date(value.date).toLocaleDateString()}`
    };
  };

  const getClassForValue = (value) => {
    if (!value || !value.count) {
      return 'color-empty';
    }
    return `color-scale-${Math.min(value.count, 5)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Submission Activity</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-[#eeeeee]" />
            <div className="w-3 h-3 rounded bg-[#d1e8ff]" />
            <div className="w-3 h-3 rounded bg-[#a3d1ff]" />
            <div className="w-3 h-3 rounded bg-[#75baff]" />
            <div className="w-3 h-3 rounded bg-[#47a3ff]" />
            <div className="w-3 h-3 rounded bg-[#198cff]" />
          </div>
          <span className="text-sm text-gray-600">More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-6 px-6">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapData}
          classForValue={getClassForValue}
          tooltipDataAttrs={getTooltipDataAttr}
          gutterSize={4}
        />
      </div>
      <Tooltip id="heatmap-tooltip" />
      
      <p className="text-sm text-gray-500 mt-4">
        Your submission activity over the past year. Darker colors indicate more submissions on that day.
      </p>
    </div>
  );
}
