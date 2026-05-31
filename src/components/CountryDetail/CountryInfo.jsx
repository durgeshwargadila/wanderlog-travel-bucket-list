import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize, MapPin, Landmark } from 'lucide-react';
import { InfoStat } from '../Common/InfoStat';

export function CountryInfo({ country }) {
  const {
    name,
    capital,
    population,
    region,
    subregion,
    languages,
    currencies,
    borders,
    area,
    timezones
  } = country;

  const commonName = name?.common || 'N/A';
  const nativeNameObj = name?.nativeName ? Object.values(name.nativeName)[0] : null;
  const nativeName = nativeNameObj?.common || 'N/A';
  
  const capitalName = capital && capital.length > 0 ? capital[0] : 'N/A';
  
  const formattedLanguages = languages 
    ? Object.values(languages).join(', ') 
    : 'N/A';
    
  const formattedCurrencies = currencies 
    ? Object.values(currencies)
        .map(curr => `${curr.name} ${curr.symbol ? `(${curr.symbol})` : ''}`)
        .join(', ')
    : 'N/A';

  const formattedTimezones = timezones 
    ? timezones.join(', ') 
    : 'N/A';

  return (
    <div className="country-info-section">
      <div className="country-info-header">
        <h1 className="country-info-title">{commonName}</h1>
        {nativeName && nativeName !== commonName && (
          <p className="country-info-native">Native Name: {nativeName}</p>
        )}
        <p className="country-info-subtitle">
          <MapPin size={16} className="location-icon" />
          {subregion ? `${subregion}, ${region}` : region}
        </p>
      </div>

      <div className="stats-grid">
        <InfoStat label="Capital City" value={capitalName} icon={Landmark} />
        <InfoStat label="Population" value={population.toLocaleString()} icon={Users} />
        <InfoStat label="Total Area" value={`${area.toLocaleString()} km²`} icon={Maximize} />
      </div>

      <div className="country-info-details-box">
        <div className="detail-row">
          <span className="detail-key">Currencies:</span>
          <span className="detail-value">{formattedCurrencies}</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Spoken Languages:</span>
          <span className="detail-value">{formattedLanguages}</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Timezones:</span>
          <span className="detail-value">{formattedTimezones}</span>
        </div>
      </div>

      <div className="country-borders-section">
        <h3 className="borders-title">Neighboring Countries</h3>
        {borders && borders.length > 0 ? (
          <div className="borders-grid">
            {borders.map((borderCode) => (
              <Link 
                key={borderCode} 
                to={`/country/${borderCode}`} 
                className="border-pill-link"
                aria-label={`View neighbor country ${borderCode}`}
              >
                {borderCode}
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-borders-text">This country is an island with no land borders.</p>
        )}
      </div>
    </div>
  );
}
