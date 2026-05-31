import { COUNTRY_API_BASE } from '../constants/api';

/**
 * Fetch all countries with field filters to keep the payload size small
 * @returns {Promise<Array>}
 */
export async function getAllCountries() {
  const fields = 'name,flags,population,region,capital,cca3';
  const response = await fetch(`${COUNTRY_API_BASE}/all?fields=${fields}`);
  if (!response.ok) {
    throw new Error('Failed to fetch country list. Please try again.');
  }
  return response.json();
}

/**
 * Fetch a single country's rich details using its 3-letter cca3 code
 * @param {string} code
 * @returns {Promise<Object>}
 */
export async function getCountryByCode(code) {
  const response = await fetch(`${COUNTRY_API_BASE}/alpha/${code}`);
  if (!response.ok) {
    throw new Error(`Failed to load country details for code: ${code}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}
