import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
const QuestionScreen = React.lazy(() => import('./components/QuestionScreen').then(module => ({ default: module.QuestionScreen })));
const MappingScreen = React.lazy(() => import('./components/MappingScreen').then(module => ({ default: module.MappingScreen })));
const RevealScreen = React.lazy(() => import('./components/RevealScreen').then(module => ({ default: module.RevealScreen })));
const LoginScreen = React.lazy(() => import('./components/LoginScreen').then(module => ({ default: module.LoginScreen })));
const RegistrationScreen = React.lazy(() => import('./components/RegistrationScreen').then(module => ({ default: module.RegistrationScreen })));
const Dashboard = React.lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const AdvancedSimulation = React.lazy(() => import('./components/AdvancedSimulation').then(module => ({ default: module.AdvancedSimulation })));
const Settings = React.lazy(() => import('./components/Settings').then(module => ({ default: module.Settings })));
const Reports = React.lazy(() => import('./components/Reports').then(module => ({ default: module.Reports })));
const Profile = React.lazy(() => import('./components/Profile').then(module => ({ default: module.Profile })));
const Library = React.lazy(() => import('./components/Library').then(module => ({ default: module.Library })));
const Lessons = React.lazy(() => import('./components/Lessons').then(module => ({ default: module.Lessons })));
const Feedback = React.lazy(() => import('./components/Feedback').then(module => ({ default: module.Feedback })));
const ExportData = React.lazy(() => import('./components/ExportData').then(module => ({ default: module.ExportData })));
const BudgetPlanner = React.lazy(() => import('./components/BudgetPlanner').then(module => ({ default: module.BudgetPlanner })));
const GoalTracker = React.lazy(() => import('./components/GoalTracker').then(module => ({ default: module.GoalTracker })));
const NotificationCenter = React.lazy(() => import('./components/NotificationCenter').then(module => ({ default: module.NotificationCenter })));
import { ProtectedRoute } from './components/ProtectedRoute';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FinanceProvider>
          <React.Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-gray-900">Loading...</div>}>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegistrationScreen />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/question"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <QuestionScreen />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mapping"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MappingScreen />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reveal"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RevealScreen />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/simulation"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdvancedSimulation />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Library />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lessons"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Lessons />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Feedback />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/export"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ExportData />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <BudgetPlanner />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <GoalTracker />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <NotificationCenter />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </FinanceProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}