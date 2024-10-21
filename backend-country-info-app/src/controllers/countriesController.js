export const getCountriesController = async () => {
  try {
    const response = await fetch(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    const allCountries = await response.json();
    return allCountries;
  } catch (error) {
    console.error(error);
  }
};

export const getCountriesBordersController = async (code) => {
  try {
    const response = await fetch(
      `https://date.nager.at/api/v3/CountryInfo/${code}`
    );

    const bordersData = await response.json();
    return bordersData;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCountriesFlagsController = async () => {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    );
    const flagsData = await response.json();
    return flagsData;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCountriesPopulationController = async () => {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population'
    );
    const populationData = await response.json();
    return populationData;
  } catch (error) {
    console.error(error);
  }
};
