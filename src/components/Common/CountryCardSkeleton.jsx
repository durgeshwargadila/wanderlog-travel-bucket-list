import React from 'react';
import { Skeleton } from './Skeleton';

export function CountryCardSkeleton() {
  return (
    <div className="country-card skeleton-card">
      <Skeleton variant="rectangular" className="skeleton-flag" height="160px" />
      <div className="country-card-info skeleton-info">
        <Skeleton variant="text" width="60%" height="24px" className="skeleton-title" />
        <div className="country-card-details">
          <Skeleton variant="text" width="80%" height="16px" />
          <Skeleton variant="text" width="70%" height="16px" />
          <Skeleton variant="text" width="50%" height="16px" />
        </div>
        <div className="country-card-actions skeleton-actions">
          <Skeleton variant="circular" width="36px" height="36px" />
          <Skeleton variant="circular" width="36px" height="36px" />
        </div>
      </div>
    </div>
  );
}
