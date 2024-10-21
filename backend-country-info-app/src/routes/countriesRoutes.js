import express from 'express';
import {
  getAllCountriesFlagsService,
  getAllCountriesPopulationService,
  getCountriesBordersService,
  getCountriesService,
} from '../services/countriesService.js';

const router = express.Router();

router.get('/', getCountriesService);

router.get('/borders/:code', getCountriesBordersService);

router.get('/flags', getAllCountriesFlagsService);

router.get('/population', getAllCountriesPopulationService);

export default router;
