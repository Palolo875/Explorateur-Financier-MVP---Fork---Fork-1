import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FinancialData, EmotionalContext, UserSettings } from '../types/finance';

interface FinanceState {
  // User data
  userQuestion: string;
  financialData: FinancialData;
  emotionalContext: EmotionalContext;
  userSettings: UserSettings;
  userCity: string;
  hasCompletedOnboarding: boolean;
  // History
  questionHistory: string[];
  financialSnapshots: {
    date: string;
    data: FinancialData;
  }[];
  // Actions
  setUserQuestion: (question: string) => void;
  setFinancialData: (data: FinancialData) => void;
  setEmotionalContext: (context: Partial<EmotionalContext>) => void;
  setUserSettings: (settings: Partial<UserSettings>) => void;
  setUserCity: (city: string) => void;
  addQuestionToHistory: (question: string) => void;
  saveFinancialSnapshot: () => void;
  completeOnboarding: () => void;
  resetData: () => void;
}

const defaultFinancialData: FinancialData = {
  incomes: [],
  expenses: [],
  savings: [],
  investments: [],
  debts: [],
  assets: [],
  liabilities: [],
};

const defaultEmotionalContext: EmotionalContext = {
  mood: 5,
  tags: [],
  financialPersonality: 'undefined',
  stressFactors: [],
};

const defaultUserSettings: UserSettings = {
  theme: 'neon',
  currency: 'EUR',
  language: 'fr',
  notificationsEnabled: true,
  dataRetentionMonths: 12,
  privacyLevel: 'standard',
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      // Initial state
      userQuestion: '',
      financialData: defaultFinancialData,
      emotionalContext: defaultEmotionalContext,
      userSettings: defaultUserSettings,
      hasCompletedOnboarding: false,
      questionHistory: [],
      financialSnapshots: [],
      userCity: 'Paris',

      // Actions
      setUserQuestion: question => set({ userQuestion: question }),
      setUserCity: city => set({ userCity: city }),
      setFinancialData: data => set({ financialData: data }),
      setEmotionalContext: context =>
        set(() => ({
          emotionalContext: { ...get().emotionalContext, ...context },
        })),
      setUserSettings: settings =>
        set(() => ({
          userSettings: { ...get().userSettings, ...settings },
        })),
      addQuestionToHistory: question =>
        set(() => ({
          questionHistory: [question, ...get().questionHistory].slice(0, 10),
        })),
      saveFinancialSnapshot: () =>
        set(() => ({
          financialSnapshots: [
            { date: new Date().toISOString(), data: get().financialData },
            ...get().financialSnapshots,
          ].slice(0, 12),
        })),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetData: () =>
        set({
          userQuestion: '',
          financialData: defaultFinancialData,
          emotionalContext: defaultEmotionalContext,
        }),
    }),
    {
      name: 'rivela-finance-storage',
      partialize: state => ({
        financialData: state.financialData,
        userSettings: state.userSettings,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        questionHistory: state.questionHistory,
        financialSnapshots: state.financialSnapshots,
        userCity: state.userCity,
      }),
    }
  )
);
