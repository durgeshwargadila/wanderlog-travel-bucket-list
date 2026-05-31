import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { SignupForm } from '../components/Auth/SignupForm';
import { Compass } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = async (email, password) => {
    setLoading(true);
    try {
      await signup(email, password);
      navigate(ROUTES.EXPLORE, { replace: true });
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

        <h1 className="auth-title">Create account</h1>

        <SignupForm 
          onSubmit={handleSignupSubmit} 
          loading={loading} 
          onAutofill={() => {}} 
        />

        <p className="auth-footer">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in instead</Link>
        </p>
      </div>
    </div>
  );
}
