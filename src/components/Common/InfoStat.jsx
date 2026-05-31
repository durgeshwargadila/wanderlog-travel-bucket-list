import React from 'react';

export function InfoStat({ label, value, icon: Icon, className = '' }) {
  return (
    <div className={`info-stat-card ${className}`}>
      {Icon && (
        <div className="info-stat-icon-wrapper" aria-hidden="true">
          <Icon className="info-stat-icon" />
        </div>
      )}
      <div className="info-stat-content">
        <span className="info-stat-label">{label}</span>
        <span className="info-stat-value">{value}</span>
      </div>
    </div>
  );
}
