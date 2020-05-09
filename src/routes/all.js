import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();


router.get('/fetch', async (req, res) => {


	// for (var i = 0; i < countries.length; i++) {
	// 	const country = await req.context.models.Country.create({
	// 		name: countries[i]["name"],
	// 		prevod: countries[i]["prevod"],
	// 		slug: countries[i]["url"],
	// 	});
	// }

	async function getDataFromAPI() {
	    let response = await fetch("https://disease.sh/v2/all?yesterday=false")
	    let json = await response.json()
		const country = await req.context.models.All.create({
			updated: json.updated,
			cases: json.cases,
			todayCases: json.todayCases,
			deaths: json.deaths,
			todayDeaths: json.todayDeaths,
			recovered: json.recovered,
			active: json.active,
			critical: json.critical,
			casesPerOneMillion: json.casesPerOneMillion,
			deathsPerOneMillion: json.deathsPerOneMillion,
			tests: json.tests,
			testsPerOneMillion: json.testsPerOneMillion,
			affectedCountries: json.affectedCountries,
		});
	}

	getDataFromAPI();


	res.send("koneeec");
});

router.get('/get', async (req, res) => {
	req.context.models.All.findAll({limit: 1, order: [ ["createdAt", "DESC"] ]}).then( (result) => res.json(result) );
});

export default router;
