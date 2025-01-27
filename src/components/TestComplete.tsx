import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ChevronRight } from 'lucide-react';
import { TestSection } from '../types';

interface TestCompleteProps {
  scores: Record<TestSection, number>;
}

export const TestComplete: React.FC<TestCompleteProps> = ({ scores }) => {
  const navigate = useNavigate();
  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

  const handleViewCertificate = () => {
    navigate('/certificate');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Award className="h-16 w-16 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Congratulations! Test Completed
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You've successfully completed all sections of the English Proficiency Test.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(scores).map(([section, score]) => (
            <div key={section} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold capitalize mb-2">{section}</h3>
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round(score)}%
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Overall Score</h2>
          <div className="text-4xl font-bold text-indigo-600">
            {Math.round(overallScore)}%
          </div>
        </div>

        <button
          onClick={handleViewCertificate}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Certificate
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};