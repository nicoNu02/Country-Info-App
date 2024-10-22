import express from 'express';
import {
  getCountriesService,
  getCountryInfoService,
} from '../services/countriesService.js';

const router = express.Router();

router.get('/', getCountriesService);

router.get('/info/:code', getCountryInfoService);

export default router;
