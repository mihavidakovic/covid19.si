import { Router } from 'express';
const countries = require('../countries.json');

const router = Router();



router.get('/:name/get', (req, res) => {
  req.context.models.Country.findAll({where: {"name":req.params.name}}).then( (result) => res.json(result) );
});


router.get('/all', (req, res) => {
  req.context.models.Country.findAll().then( (result) => res.json(result) );
});

router.get('/sync', async (req, res) => {
	for (var i = 0; i < countries.length; i++) {
		const country = await req.context.models.Country.create({
			name: countries[i]["name"],
			prevod: countries[i]["prevod"],
			slug: countries[i]["url"],
		});
	}

	res.send("konc");
});

export default router;
