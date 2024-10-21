import {
  getAllCountriesFlagsController,
  getAllCountriesPopulationController,
  getCountriesBordersController,
  getCountriesController,
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

export const getCountriesBordersService = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ message: 'Country code is required' });
    }
    const borders = await getCountriesBordersController(code);
    res.status(200).json(borders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCountriesFlagsService = async (req, res) => {
  try {
    const flags = await getAllCountriesFlagsController();
    res.status(200).json(flags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCountriesPopulationService = async (req, res) => {
  try {
    const populationData = await getAllCountriesPopulationController();
    res.status(200).json(populationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
