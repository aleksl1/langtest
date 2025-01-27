import { create } from 'zustand';
import { User, TestResult } from '../types';

interface AppState {
  user: User | null;
  currentTest: TestResult | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setCurrentTest: (test: TestResult | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentTest: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setCurrentTest: (test) => set({ currentTest: test }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));