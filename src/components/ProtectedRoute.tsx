import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFinanceStore } from '../stores/financeStore';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const {
    isLoggedIn
  } = useFinanceStore();
  const location = useLocation();
  // Add debug logging
  useEffect(() => {
    console.log('ProtectedRoute - Auth state:', {
      isLoggedIn,
      path: location.pathname
    });
  }, [isLoggedIn, location.pathname]);
  if (!isLoggedIn) {
    console.log('Not logged in, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  console.log('User authenticated, rendering protected content');
  return <>{children}</>;
}