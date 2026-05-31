import React, { useState, useEffect, useMemo } from 'react';
import { useCountries } from '../hooks/useCountries';
import { SearchBar } from '../components/Explore/SearchBar';
import { CountryGrid } from '../components/Explore/CountryGrid';
import { CONTINENTS, SORT_OPTIONS } from '../constants/filterOptions';
import { ActionButton } from '../components/Common/ActionButton';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ExplorePage() {
  const { countries, loading, error, refetch } = useCountries();
  
  // Explorer filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Memoized filter and sorting computation
  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (activeRegion !== 'All') {
      result = result.filter(
        (c) => c.region && c.region.toLowerCase() === activeRegion.toLowerCase()
      );
    }

    if (debouncedSearchQuery.trim() !== '') {
      const q = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          (c.name?.common && c.name.common.toLowerCase().includes(q)) ||
          (c.capital && c.capital.some((cap) => cap.toLowerCase().includes(q)))
      );
    }

    result.sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      const popA = a.population || 0;
      const popB = b.population || 0;
      
      // Keep safety fallbacks
      const areaA = a.area || 0;
      const areaB = b.area || 0;

      switch (sortBy) {
        case 'name_asc':
          return nameA.localeCompare(nameB);
        case 'name_desc':
          return nameB.localeCompare(nameA);
        case 'pop_desc':
          return popB - popA;
        case 'pop_asc':
          return popA - popB;
        case 'area_desc':
          return areaB - areaA;
        case 'area_asc':
          return areaA - areaB;
        default:
          return 0;
      }
    });

    return result;
  }, [countries, debouncedSearchQuery, activeRegion, sortBy]);

  return (
    <div className="explore-page-container">
      <header className="explore-hero">
        <h1 className="explore-hero-title">Explore the World</h1>
        <p className="explore-hero-subtitle">
          Search countries, discover coordinates, and map out your next adventure.
        </p>
      </header>

      {/* Main filters control panel */}
      <section className="explore-controls-panel">
        <div className="explore-search-sort-row">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="sort-select-wrapper">
            <label htmlFor="sort-countries" className="sr-only">Sort countries</label>
            <select
              id="sort-countries"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown-select"
              aria-label="Sort country grid results"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Region tabs pills list */}
        <div className="region-filter-pills" role="tablist" aria-label="Filter countries by continent">
          {CONTINENTS.map((region) => (
            <button
              key={region}
              type="button"
              role="tab"
              aria-selected={activeRegion === region}
              className={`region-pill ${activeRegion === region ? 'active' : ''}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      {/* Error and lists layouts */}
      <main className="explore-main-content">
        {error ? (
          <div className="error-panel glass-panel">
            <AlertCircle className="error-icon" size={48} />
            <h3 className="error-title">Failed to load countries</h3>
            <p className="error-message">{error}</p>
            <ActionButton 
              variant="outline" 
              onClick={() => refetch()}
              className="btn-retry"
              ariaLabel="Retry connection to countries server"
            >
              <RotateCcw size={16} style={{ marginRight: '8px' }} />
              Retry Connection
            </ActionButton>
          </div>
        ) : (
          <CountryGrid countries={filteredCountries} loading={loading} />
        )}
      </main>
    </div>
  );
}
