export const getCountriesController = async () => {
  try {
    const response = await fetch(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const allCountries = await response.json();
    return allCountries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountryInfoController = async (code) => {
  try {
    const bordersData = await fetch(
      `https://date.nager.at/api/v3/CountryInfo/${code}`
    );
    if (!bordersData.ok) {
      throw new Error(`Error: ${bordersData.statusText}`);
    }
    const { borders, commonName, officialName } = await bordersData.json();
    const bordersFlagsData = await Promise.all(
      borders.map(async (border) => {
        const flagsData = await fetch(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              iso2: border.countryCode,
            }),
          }
        );

        const { data } = await flagsData.json();
        return data;
      })
    );
    if (bordersFlagsData.length !== borders.length) {
      throw new Error('Error: Failed to fetch border flags');
    }
    const countryFlag = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iso2: code,
        }),
      }
    );
    if (!countryFlag.ok) {
      throw new Error(`Error: ${countryFlag.statusText}`);
    }
    const contryFlagData = await countryFlag.json();

    const population = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: commonName,
        }),
      }
    );
    if (!population.ok) {
      throw new Error(`Error: ${population.statusText}`);
    }
    const populationData = await population.json();
    const filteredBordersFlags = bordersFlagsData.filter(
      (border) => border !== undefined
    );
    const bordersWithFlags = borders.map((border) => {
      const flag = filteredBordersFlags.find(
        (flag) => flag.iso2 === border.countryCode
      );
      return {
        ...border,
        flag: flag ? flag.flag.trim(' ') : null,
      };
    });

    return {
      commonName,
      officialName,
      borders: bordersWithFlags,
      flag: contryFlagData.data ? contryFlagData.data.flag.trim(' ') : null,
      population: populationData.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
