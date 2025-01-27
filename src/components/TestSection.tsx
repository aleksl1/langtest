import React, { useState } from 'react';
import { Question, TestSection as TestSectionType } from '../types';
import { Send, ChevronRight } from 'lucide-react';

interface TestSectionProps {
  section: TestSectionType;
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
  currentSectionIndex: number;
}

export const TestSection: React.FC<TestSectionProps> = ({
  section,
  questions,
  onComplete,
  currentSectionIndex,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const sections: TestSectionType[] = ['grammar', 'vocabulary', 'reading', 'writing'];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Section Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">{section} Section</h2>
          <span className="text-sm text-gray-500">
            Section {currentSectionIndex + 1} of {sections.length}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {sections.map((s, index) => (
            <div
              key={s}
              className={`h-2 rounded-full ${
                index < currentSectionIndex
                  ? 'bg-green-500'
                  : index === currentSectionIndex
                  ? 'bg-indigo-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {!currentQuestion ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-4">No Questions Available</h3>
          <p className="text-gray-600 mb-6">
            This section currently has no questions. Please proceed to the next section.
          </p>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Continue to Next Section
          </button>
        </div>
      ) : (
        <>
          {/* Question Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="bg-gray-200 h-2 rounded-full">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg mb-6">{currentQuestion.content}</p>
            
            {section === 'writing' ? (
              <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={6}
                placeholder="Write your answer here..."
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              />
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors duration-200 ${
                      answers[currentQuestion.id] === option
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="flex-grow">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className={`flex items-center px-6 py-3 rounded-md ${
                  answers[currentQuestion.id]
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                Next Question
                <ChevronRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion.id]}
                className={`flex items-center px-6 py-3 rounded-md ${
                  answers[currentQuestion.id]
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                <Send className="mr-2" />
                Complete Section
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};