export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type TestSection = 'grammar' | 'vocabulary' | 'reading' | 'writing';

export type Question = {
  id: string;
  section: TestSection;
  difficulty: number;
  content: string;
  options?: string[];
  correct_answer?: string;
};

export type TestResult = {
  id: string;
  user_id: string;
  section_scores: Record<TestSection, number>;
  overall_score: number;
  proficiency_level: string;
  completed_at: string;
};