import { useState } from 'react';
import { Question, TestSection, TestResult } from '../types';
import { supabase } from '../lib/supabase';

export const useTest = (user: any) => {
  const [questions, setQuestions] = useState<Record<string, Question[]>>({
    grammar: [],
    vocabulary: [],
    reading: [],
    writing: []
  });
  const [currentSection, setCurrentSection] = useState<string>('grammar');
  const [sectionScores, setSectionScores] = useState<Record<TestSection, number>>({
    grammar: 0,
    vocabulary: 0,
    reading: 0,
    writing: 0
  });
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const calculateProficiencyLevel = (overallScore: number): string => {
    if (overallScore >= 90) return 'Expert';
    if (overallScore >= 80) return 'Advanced';
    if (overallScore >= 70) return 'Upper Intermediate';
    if (overallScore >= 60) return 'Intermediate';
    if (overallScore >= 50) return 'Lower Intermediate';
    return 'Beginner';
  };

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*');

    if (error) {
      console.error('Error fetching questions:', error);
      return;
    }

    const groupedQuestions = data.reduce((acc: Record<string, Question[]>, question) => {
      if (!acc[question.section]) {
        acc[question.section] = [];
      }
      acc[question.section].push(question);
      return acc;
    }, {});

    setQuestions(groupedQuestions);
  };

  const handleSectionComplete = async (answers: Record<string, string>) => {
    const sectionQuestions = questions[currentSection];
    let correctAnswers = 0;
    
    sectionQuestions.forEach(question => {
      if (question.correct_answer && answers[question.id] === question.correct_answer) {
        correctAnswers++;
      }
    });

    const sectionScore = (correctAnswers / sectionQuestions.length) * 100;
    
    const newSectionScores = {
      ...sectionScores,
      [currentSection]: sectionScore
    };
    setSectionScores(newSectionScores);

    const sections: TestSection[] = ['grammar', 'vocabulary', 'reading', 'writing'];
    const currentIndex = sections.indexOf(currentSection as TestSection);
    
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else {
      const overallScore = Object.values(newSectionScores).reduce((a, b) => a + b, 0) / sections.length;
      const proficiencyLevel = calculateProficiencyLevel(overallScore);

      try {
        // Insert new result directly without checking for existing one
        const { data, error } = await supabase
          .from('test_results')
          .insert({
            user_id: user.id,
            section_scores: newSectionScores,
            overall_score: overallScore,
            proficiency_level: proficiencyLevel,
            completed_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        setTestResult(data);
        setTestCompleted(true);
      } catch (error) {
        console.error('Error saving test results:', error);
        // Still set as completed even if save fails
        setTestCompleted(true);
      }
    }
  };

  return {
    questions,
    currentSection,
    sectionScores,
    testCompleted,
    testResult,
    fetchQuestions,
    handleSectionComplete,
    calculateProficiencyLevel
  };
}; 