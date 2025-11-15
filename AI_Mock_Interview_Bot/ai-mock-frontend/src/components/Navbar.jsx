import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">AI Mock Interview</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-sm">Dashboard</Link>
          <Link to="/interview" className="text-sm">Interview</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name || user.email}</span>
              <button onClick={logout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <Link to="/" className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
