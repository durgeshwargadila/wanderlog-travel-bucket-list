import React from 'react';

export function Skeleton({ className = '', variant = 'text', width, height, ...props }) {
  const styles = {
    width,
    height,
  };

  return (
    <div
      className={`shimmer skeleton skeleton-${variant} ${className}`}
      style={styles}
      role="progressbar"
      aria-label="Loading content"
      {...props}
    />
  );
}
