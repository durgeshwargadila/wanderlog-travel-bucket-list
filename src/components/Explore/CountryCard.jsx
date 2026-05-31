import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Check } from 'lucide-react';
import { useBucketList } from '../../hooks/useBucketList';

export const CountryCard = React.memo(function CountryCard({ country }) {
  const navigate = useNavigate();
  const { toggleWishlist, toggleVisited, isInWishlist, isInVisited } = useBucketList();
  
  const { cca3, name, flags, capital, population, region } = country;
  const commonName = name?.common || 'Unknown';
  const flagUrl = flags?.svg || flags?.png || '';
  const capitalName = capital && capital.length > 0 ? capital[0] : 'N/A';

  const wishlisted = isInWishlist(cca3);
  const visited = isInVisited(cca3);

  const handleCardClick = () => {
    navigate(`/country/${cca3}`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist({ cca3, name, flags, capital, population, region });
  };

  const handleVisitedToggle = (e) => {
    e.stopPropagation();
    toggleVisited({ cca3, name, flags, capital, population, region });
  };

  return (
    <div 
      className="country-card" 
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${commonName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="country-card-flag-wrapper">
        <img 
          src={flagUrl} 
          alt={`Flag of ${commonName}`} 
          className="country-card-flag"
          loading="lazy" 
        />
        <div className="country-card-overlay-actions">
          <button
            type="button"
            className={`overlay-btn btn-wishlist ${wishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={`${wishlisted ? 'Remove from' : 'Add to'} Bucket List`}
          >
            <Heart className="icon-heart" fill={wishlisted ? 'currentColor' : 'none'} size={18} />
          </button>
          <button
            type="button"
            className={`overlay-btn btn-visited ${visited ? 'active' : ''}`}
            onClick={handleVisitedToggle}
            aria-label={`${visited ? 'Mark as' : 'Remove from'} Visited`}
          >
            <Check className="icon-check" size={18} />
          </button>
        </div>
      </div>
      <div className="country-card-info">
        <h3 className="country-card-title">{commonName}</h3>
        <div className="country-card-details">
          <p><span className="label">Capital:</span> {capitalName}</p>
          <p><span className="label">Population:</span> {population.toLocaleString()}</p>
          <p><span className="label">Region:</span> {region}</p>
        </div>
      </div>
    </div>
  );
});
