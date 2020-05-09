import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import models, { sequelize } from './models';

const countries = require('./countries.json');

const app = express();

app.use(cors());

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sync', async (req, res) => {
	for (var i = 0; i < countries.length; i++) {
		const country = await req.context.models.Country.create({
			name: countries[i]["name"],
			prevod: countries[i]["prevod"],
			slug: countries[i]["url"],
		});
	}
});

sequelize.sync().then(() => {
	app.listen(process.env.PORT, () =>
	  console.log(`Example app listening on port ${process.env.PORT}!`),
	);
});