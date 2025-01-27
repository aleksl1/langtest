import React from 'react';
import { Award } from 'lucide-react';
import { TestResult, User } from '../types';

interface CertificateProps {
  user: User;
  result: TestResult;
}

export const Certificate: React.FC<CertificateProps> = ({ user, result }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border-8 border-double border-gray-200 rounded-lg shadow-lg">
      <div className="text-center">
        <Award className="w-16 h-16 mx-auto text-indigo-600" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Certificate of Proficiency</h1>
        <p className="mt-2 text-xl text-gray-600">English Language Assessment</p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg">This is to certify that</p>
        <p className="mt-2 text-3xl font-bold text-indigo-600">{user.name}</p>
        <p className="mt-2 text-lg">has achieved</p>
        <p className="mt-2 text-3xl font-bold text-indigo-600">
          {result.proficiency_level}
        </p>
        <p className="mt-2 text-lg">level of English proficiency</p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Detailed Scores:</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(result.section_scores).map(([section, score]) => (
            <div key={section} className="flex justify-between items-center">
              <span className="capitalize">{section}:</span>
              <span className="font-bold">{score}%</span>
            </div>
          ))}
          <div className="col-span-2 mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold">Overall Score:</span>
              <span className="font-bold text-xl text-indigo-600">
                {result.overall_score}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Certificate issued on {new Date(result.completed_at).toLocaleDateString()}</p>
        <p>Certificate ID: {result.id}</p>
      </div>
    </div>
  );
};