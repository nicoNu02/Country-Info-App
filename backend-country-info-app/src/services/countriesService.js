import {
  getCountriesController,
  getCountryInfoController,
} from '../controllers/countriesController.js';

export const getCountriesService = async (req, res) => {
  try {
    const countries = await getCountriesController();
    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCountryInfoService = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ message: 'Country code is required' });
    }
    if (code.length !== 2) {
      return res.status(400).json({ message: 'Invalid country code' });
    }
    const borders = await getCountryInfoController(code);
    res.status(200).json(borders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
