import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { QuestionScreen } from './components/QuestionScreen';
import { MappingScreen } from './components/MappingScreen';
import { RevealScreen } from './components/RevealScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { Dashboard } from './components/Dashboard';
import { AdvancedSimulation } from './components/AdvancedSimulation';
import { Settings } from './components/Settings';
import { Reports } from './components/Reports';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider } from './context/ThemeContext';
import { useFinanceStore } from './stores/financeStore';
import './styles/globals.css';
import { Profile } from './components/Profile';
import { Library } from './components/Library';
import { Lessons } from './components/Lessons';
import { Feedback } from './components/Feedback';
import { ExportData } from './components/ExportData';
import { BudgetPlanner } from './components/BudgetPlanner';
import { GoalTracker } from './components/GoalTracker';
import { NotificationCenter } from './components/NotificationCenter';
export function App() {
  return <BrowserRouter>
      <ThemeProvider>
        <FinanceProvider>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/question" element={<ProtectedRoute><Layout><QuestionScreen /></Layout></ProtectedRoute>} />
            <Route path="/mapping" element={<ProtectedRoute><Layout><MappingScreen /></Layout></ProtectedRoute>} />
            <Route path="/reveal" element={<ProtectedRoute><Layout><RevealScreen /></Layout></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/simulation" element={<ProtectedRoute><Layout><AdvancedSimulation /></Layout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
            <Route path="/lessons" element={<ProtectedRoute><Layout><Lessons /></Layout></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Layout><Feedback /></Layout></ProtectedRoute>} />
            <Route path="/export" element={<ProtectedRoute><Layout><ExportData /></Layout></ProtectedRoute>} />
            <Route path="/budget" element={<ProtectedRoute><Layout><BudgetPlanner /></Layout></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Layout><GoalTracker /></Layout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Layout><NotificationCenter /></Layout></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FinanceProvider>
      </ThemeProvider>
    </BrowserRouter>;
}