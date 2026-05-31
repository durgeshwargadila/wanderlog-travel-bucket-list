import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { Sun, Moon, LogOut, Compass, Menu, X, User } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('wanderlog_theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('wanderlog_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('wanderlog_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate(ROUTES.LOGIN);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={ROUTES.EXPLORE} className="navbar-logo" onClick={() => setIsOpen(false)}>
          <Compass className="navbar-logo-icon" size={24} />
          <span className="navbar-logo-text">WanderLog</span>
        </Link>

        <div className="navbar-mobile-controls">
          <button
            type="button"
            className="btn-theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle theme color mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated && (
            <button
              type="button"
              className="btn-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.EXPLORE}
                className={`navbar-link ${isActive(ROUTES.EXPLORE) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <Link
                to={ROUTES.BUCKET_LIST}
                className={`navbar-link ${isActive(ROUTES.BUCKET_LIST) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Bucket List
              </Link>

              <div className="navbar-desktop-actions">
                <button
                  type="button"
                  className="btn-theme-toggle desktop-theme-toggle"
                  onClick={toggleDarkMode}
                  aria-label="Toggle theme color mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="user-profile-badge" title={userEmail}>
                  <User size={16} className="user-icon" />
                  <span className="user-email-text">{userEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-logout"
                  aria-label="Sign out of account"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>

              <div className="navbar-mobile-actions">
                <div className="mobile-user-info">
                  <User size={16} />
                  <span>{userEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-logout mobile-btn-logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-desktop-actions">
              <button
                type="button"
                className="btn-theme-toggle desktop-theme-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle theme color mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
