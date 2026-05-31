import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../api/countriesApi';
import { CountryInfo } from '../components/CountryDetail/CountryInfo';
import { ActionButtons } from '../components/CountryDetail/ActionButtons';
import { CountryDetailSkeleton } from '../components/Common/CountryDetailSkeleton';
import { ArrowLeft, AlertCircle, RotateCcw } from 'lucide-react';
import { ActionButton } from '../components/Common/ActionButton';

export default function CountryDetailPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCountryByCode(code);
      setCountry(data);
    } catch (err) {
      setError(err.message || 'Failed to load country details.');
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="detail-page-wrapper">
        <CountryDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page-wrapper">
        <button type="button" onClick={handleBack} className="btn-back" aria-label="Go back">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <div className="error-panel glass-panel detail-error-panel">
          <AlertCircle className="error-icon" size={48} />
          <h3 className="error-title">Country Details Unavailable</h3>
          <p className="error-message">{error}</p>
          <ActionButton variant="outline" onClick={fetchDetail} className="btn-retry" ariaLabel="Retry loading country details">
            <RotateCcw size={16} style={{ marginRight: '8px' }} />
            Retry Load
          </ActionButton>
        </div>
      </div>
    );
  }

  if (!country) return null;

  const commonName = country.name?.common || 'Country';
  const flagUrl = country.flags?.svg || country.flags?.png || '';

  return (
    <div className="detail-page-wrapper">
      <button 
        type="button" 
        onClick={handleBack} 
        className="btn-back"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="country-detail-container glass-panel">
        <div className="country-detail-grid">
          <div className="country-detail-flag-wrapper">
            <img 
              src={flagUrl} 
              alt={`Flag of ${commonName}`} 
              className="country-detail-flag" 
            />
          </div>

          <div className="country-detail-content">
            <CountryInfo country={country} />
            <ActionButtons country={country} />
          </div>
        </div>
      </div>
    </div>
  );
}
