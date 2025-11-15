import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import InterviewPage from './pages/Interview/InterviewPage.jsx';
import OAuthSuccess from './pages/Auth/OAuthSuccess.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Route>
    </Routes>
  );
}
