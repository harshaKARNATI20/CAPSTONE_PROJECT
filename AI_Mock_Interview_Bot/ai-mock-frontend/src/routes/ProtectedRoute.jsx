import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { token, loading } = useAuth();
  if (loading) return <div className="p-8">Loading...</div>;
  return token ? <Outlet /> : <Navigate to="/" replace />;
}
