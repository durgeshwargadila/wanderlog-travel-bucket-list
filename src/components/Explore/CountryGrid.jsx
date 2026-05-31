import React from 'react';
import { CountryCard } from './CountryCard';
import { CountryCardSkeleton } from '../Common/CountryCardSkeleton';
import { Globe } from 'lucide-react';

export function CountryGrid({ countries, loading }) {
  if (loading) {
    return (
      <div className="country-grid">
        {Array.from({ length: 12 }).map((_, index) => (
          <CountryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="empty-state-container">
        <Globe className="empty-state-icon animated-globe" size={64} />
        <h3 className="empty-state-title">No countries found</h3>
        <p className="empty-state-message">Try adjusting your filters or clearing the search query.</p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}
