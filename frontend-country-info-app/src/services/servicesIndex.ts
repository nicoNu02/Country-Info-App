import { Countries, Country } from '@/app/types';
import { useState } from 'react';

const AppServices = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCountriesService: () => Promise<Countries> = () =>
    fetchData('http://localhost:3001/countries');

  const getCountryInfoService: (code: string) => Promise<Country> = (
    code: string
  ) => fetchData(`http://localhost:3001/countries/info/${code}`);

  return {
    getCountriesService,
    getCountryInfoService,
    loading,
    error,
  };
};

export default AppServices;
