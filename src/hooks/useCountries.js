import { useState, useEffect, useCallback } from 'react';
import { getAllCountries } from '../api/countriesApi';

let cachedCountries = null;

export function useCountries() {
  const [countries, setCountries] = useState(cachedCountries || []);
  const [loading, setLoading] = useState(!cachedCountries);
  const [error, setError] = useState(null);

  const fetchCountries = useCallback(async (force = false) => {
    if (cachedCountries && !force) {
      setCountries(cachedCountries);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAllCountries();
      cachedCountries = data;
      setCountries(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch country list.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cachedCountries) {
      fetchCountries();
    }
  }, [fetchCountries]);

  return {
    countries,
    loading,
    error,
    refetch: () => fetchCountries(true)
  };
}
