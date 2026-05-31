import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ActionButton } from '../Common/ActionButton';

export function SignupForm({ onSubmit, loading, onAutofill }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(email, password);
  };

  const handleAutofillClick = () => {
    setEmail('eve.holt@reqres.in');
    setPassword('cityslicka');
    setConfirmPassword('cityslicka');
    setErrors({});
    onAutofill();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={18} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="you@example.com"
            className={errors.email ? 'input-error' : ''}
            required
          />
        </div>
        {errors.email && <span className="error-text" role="alert">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            placeholder="Minimum 6 characters"
            className={errors.password ? 'input-error' : ''}
            required
          />
          <button
            type="button"
            className="btn-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <span className="error-text" role="alert">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            placeholder="Re-enter password"
            className={errors.confirmPassword ? 'input-error' : ''}
            required
          />
        </div>
        {errors.confirmPassword && <span className="error-text" role="alert">{errors.confirmPassword}</span>}
      </div>

      <div 
        className="autofill-helper" 
        onClick={handleAutofillClick} 
        role="button" 
        tabIndex={0} 
        onKeyDown={(e) => e.key === 'Enter' && handleAutofillClick()}
      >
        <p><strong>Demo Test Credentials:</strong> (Click to autofill)</p>
        <code>Email: eve.holt@reqres.in / Password: any</code>
      </div>

      <ActionButton
        type="submit"
        variant="primary"
        loading={loading}
        className="btn-auth-submit"
        ariaLabel="Create a new account"
      >
        Sign Up
      </ActionButton>
    </form>
  );
}
