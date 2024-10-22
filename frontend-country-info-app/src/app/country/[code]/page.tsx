'use client';

import { Country } from '@/app/types';
import AppServices from '@/services/servicesIndex';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import Loader from '@/app/components/Loader';
import Image from 'next/image';
import CountryCard from '@/app/components/countryCard';

const CountryDetail = () => {
  const { code } = useParams();
  const { getCountryInfoService, loading, error } = AppServices();
  const [country, setCountry] = useState<Country | null>(null);
  useEffect(() => {
    const getCountryInfo = async () => {
      const country = await getCountryInfoService(code as string);
      setCountry(country);
    };
    getCountryInfo();
  }, []);
  const countryPopulationYearData = useMemo(
    () =>
      country?.population.populationCounts.map((population) => population.year),
    [country]
  );
  const countryPopulationValueData = useMemo(
    () =>
      country?.population.populationCounts.map(
        (population) => population.value
      ),
    [country]
  );
  return loading ? (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Loader />
    </div>
  ) : error ? (
    <div className='p-4 text-red-500'>Error: {error}</div>
  ) : (
    <div className='p-4'>
      <div className='text-black flex items-center gap-2 mb-4'>
        <div
          onClick={() => window.history.back()}
          className='w-8 h-8 hover:cursor-pointer hover:bg-gray-300 transition-all ease-in-out duration-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path d='M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z'></path>
          </svg>
        </div>
        <h1 className='text-2xl font-bold'>Country Details</h1>
      </div>
      <div className='flex gap-4 justify-between p-4 bg-gray-500 rounded-md mb-4'>
        <div className=''>
          <h2 className='text-2xl font-bold'>{country?.commonName}</h2>
          <h3>{country?.officialName}</h3>
        </div>
        {country?.flag ? (
          <Image
            src={country.flag}
            alt={country.commonName}
            width={300}
            height={200}
            className='rounded-md w-1/3'
          />
        ) : (
          <div>No flag available</div>
        )}
      </div>
      <div className='p-4 bg-gray-800 rounded-md'>
        <h3 className='text-xl font-bold p-4 pl-0 text-white'>
          Border Countries:
        </h3>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-3'>
          {country && country?.borders.length > 0 ? (
            country?.borders.map((border) => (
              <CountryCard
                flag={border.flag}
                key={border.countryCode}
                countryCode={border.countryCode}
                name={border.commonName}
              />
            ))
          ) : (
            <div>No border countries available</div>
          )}
        </div>
      </div>
      <div>
        <h3 className='text-xl font-bold p-4 pl-0'>
          {country?.commonName} Population over time:
        </h3>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: countryPopulationYearData,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: countryPopulationValueData,
            },
          ]}
          loading={loading}
          height={300}
        />
      </div>
    </div>
  );
};

export default CountryDetail;
