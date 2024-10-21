import express from 'express';
import cors from 'cors';
import router from './src/routes/countriesRoutes.js';

const app = express();

const PORT = 3001;
app.use(cors());
app.use(express.json());

app.use('/countries', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
