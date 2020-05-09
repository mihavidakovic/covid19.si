import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});


app.use(cors());

app.use('/api/country', routes.country);
app.use('/api/all', routes.all);



sequelize.sync().then(() => {
	app.listen(process.env.PORT, () =>
	  console.log(`Example app listening on port ${process.env.PORT}!`),
	);
});