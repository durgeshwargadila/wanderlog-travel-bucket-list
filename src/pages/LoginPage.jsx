import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { LoginForm } from '../components/Auth/LoginForm';
import { Compass } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || ROUTES.EXPLORE;

  const handleLoginSubmit = async (email, password) => {
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Handled inside AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-logo">
            <Compass className="auth-logo-icon animate-spin-slow" size={40} />
            <h2>WanderLog</h2>
          </div>
          <p className="auth-subtitle">Your journey. Your bucket list.</p>
        </div>

        <h1 className="auth-title">Welcome back!</h1>

        <LoginForm 
          onSubmit={handleLoginSubmit} 
          loading={loading} 
          onAutofill={() => {}} 
        />

        <p className="auth-footer">
          Don't have an account? <Link to={ROUTES.SIGNUP}>Create account</Link>
        </p>
      </div>
    </div>
  );
}
