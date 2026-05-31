import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card glass-panel text-center">
        <Compass className="not-found-icon animate-spin-slow" size={64} />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to={ROUTES.EXPLORE} className="btn btn-primary btn-back-home">
          <ArrowLeft size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          <span>Back to Explore</span>
        </Link>
      </div>
    </div>
  );
}
