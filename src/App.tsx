import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/AuthForm';
import { TestSection } from './components/TestSection';
import { Certificate } from './components/Certificate';
import { useStore } from './store/useStore';
import { supabase } from './lib/supabase';
import { Question, TestSection as TestSectionType, TestResult } from './types';
import { Layout } from './components/Layout';
import { TestComplete } from './components/TestComplete';
import { useTest } from './hooks/useTest';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

function App() {
  const { user, setUser } = useStore();
  const {
    questions,
    currentSection,
    sectionScores,
    testCompleted,
    fetchQuestions,
    handleSectionComplete,
    calculateProficiencyLevel
  } = useTest(user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          created_at: session.user.created_at,
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          created_at: session.user.created_at,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/"
            element={user ? <Navigate to="/test" /> : <AuthForm />}
          />
          <Route
            path="/test"
            element={
              user ? (
                testCompleted ? (
                  <TestComplete scores={sectionScores} />
                ) : (
                  <TestSection
                    section={currentSection as TestSectionType}
                    questions={questions[currentSection] || []}
                    onComplete={handleSectionComplete}
                    currentSectionIndex={['grammar', 'vocabulary', 'reading', 'writing'].indexOf(currentSection)}
                  />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/certificate"
            element={
              user && testCompleted ? (
                <Certificate
                  user={user}
                  result={{
                    id: '',
                    user_id: user.id,
                    section_scores: sectionScores,
                    overall_score: Object.values(sectionScores).reduce((a, b) => a + b, 0) / 4,
                    proficiency_level: calculateProficiencyLevel(
                      Object.values(sectionScores).reduce((a, b) => a + b, 0) / 4
                    ),
                    completed_at: new Date().toISOString(),
                  }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;