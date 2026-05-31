import React from 'react';
import { Skeleton } from './Skeleton';

export function CountryDetailSkeleton() {
  return (
    <div className="country-detail-container skeleton-detail-container">
      <Skeleton variant="text" width="80px" height="32px" className="skeleton-back" />
      <div className="country-detail-grid">
        <div className="country-detail-flag-wrapper">
          <Skeleton variant="rectangular" className="skeleton-detail-flag" height="300px" />
        </div>
        <div className="country-detail-content">
          <Skeleton variant="text" width="50%" height="48px" className="skeleton-detail-title" />
          <Skeleton variant="text" width="30%" height="24px" className="skeleton-detail-sub" />
          
          <div className="stats-grid">
            <Skeleton variant="rectangular" height="80px" />
            <Skeleton variant="rectangular" height="80px" />
            <Skeleton variant="rectangular" height="80px" />
          </div>

          <div className="country-info-details">
            <Skeleton variant="text" width="90%" height="20px" />
            <Skeleton variant="text" width="85%" height="20px" />
            <Skeleton variant="text" width="80%" height="20px" />
            <Skeleton variant="text" width="95%" height="20px" />
          </div>

          <div className="skeleton-detail-actions">
            <Skeleton variant="rectangular" width="180px" height="48px" />
            <Skeleton variant="rectangular" width="180px" height="48px" />
          </div>
        </div>
      </div>
    </div>
  );
}
