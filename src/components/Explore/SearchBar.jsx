import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Search countries...' }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar-icon" aria-hidden="true">
        <Search className="icon-search" size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="search-clear-button"
          aria-label="Clear search query"
        >
          <X className="icon-clear" size={16} />
        </button>
      )}
    </div>
  );
}
