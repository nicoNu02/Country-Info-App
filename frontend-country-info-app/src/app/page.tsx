'use client';

import { useEffect, useState } from 'react';
import AppServices from '../services/servicesIndex';
import { Countries } from './types';
import CountryCard from './components/countryCard';
import Loader from './components/Loader';

export default function Home() {
  const { getCountriesService, loading, error } = AppServices();
  const [countries, setCountries] = useState<Countries>([]);
  const [filteredCountries, setFilteredCountries] = useState<Countries>([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await getCountriesService();
      setCountries(countriesData);
      setFilteredCountries(countriesData);
    };
    getCountries();
  }, []);
  // Added search feature, done in the client to add a plus of user experience
  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-4'>
      <h1 className='text-2xl font-bold bg-gray-800 text-white rounded-md p-4 mb-4'>
        Country Info App
      </h1>
      <p className='mb-4'>Get information about countries</p>

      {loading ? (
        <div className='flex justify-center flex-1 items-center'>
          <Loader />
        </div>
      ) : error ? (
        <div className='flex justify-center flex-1 items-center'>
          <p className='text-red-500'>{error}</p>
        </div>
      ) : (
        <>
          <form className='flex gap-4' onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              placeholder='Enter country name'
              className='border border-gray-300 p-2 rounded mb-4'
              onChange={handleSearch}
              value={searchText}
            />
          </form>
          {filteredCountries.length === 0 ? (
            <div className='flex justify-center items-center w-full'>
              <p>No countries found</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {filteredCountries.map((country) => (
                <CountryCard
                  flag={null}
                  key={country.countryCode}
                  countryCode={country.countryCode}
                  name={country.name}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
