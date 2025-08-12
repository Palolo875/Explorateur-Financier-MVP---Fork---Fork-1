import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
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

const router = createBrowserRouter(
  [
    { path: '/login', element: <LoginScreen /> },
    { path: '/register', element: <RegistrationScreen /> },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'question', element: <QuestionScreen /> },
        { path: 'mapping', element: <MappingScreen /> },
        { path: 'reveal', element: <RevealScreen /> },
        { path: 'simulation', element: <AdvancedSimulation /> },
        { path: 'reports', element: <Reports /> },
        { path: 'settings', element: <Settings /> },
        { path: 'profile', element: <Profile /> },
        { path: 'library', element: <Library /> },
        { path: 'lessons', element: <Lessons /> },
        { path: 'feedback', element: <Feedback /> },
        { path: 'export', element: <ExportData /> },
        { path: 'budget', element: <BudgetPlanner /> },
        { path: 'goals', element: <GoalTracker /> },
        { path: 'notifications', element: <NotificationCenter /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-gray-900">Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </FinanceProvider>
    </ThemeProvider>
  );
}