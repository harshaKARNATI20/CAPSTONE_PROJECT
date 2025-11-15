import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('token', token);
        login(token);

        // small delay ensures context updates before redirect
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        console.error('No token found in OAuth redirect URL.');
        navigate('/');
      }
    } catch (error) {
      console.error('OAuth Success Error:', error);
      navigate('/');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-3">Signing you in...</h1>
      <p className="text-gray-600">Please wait while we set up your dashboard.</p>
    </div>
  );
}
