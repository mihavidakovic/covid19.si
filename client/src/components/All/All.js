import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faViruses, faAmbulance, faLungsVirus, faHandSparkles } from '@fortawesome/free-solid-svg-icons'


function All() {

	const [data, setData] = useState({
		cases: 0,
		todayCases: 0,
		deaths: 0,
		todayDeaths: 0,
		recovered: 0,
		active: 0,
		critical: 0,
		casesPerOneMillion: 0,
		deathsPerOneMillion: 0,
		tests: 0,
		testsPerOneMillion: 0,
		affectedCountries: 0,
		createdAt: 0
	})

	useEffect(() => {

		fetch(process.env.REACT_APP_API_URL + "/all/get")
			.then( response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then( json => {
				console.log(json[0])
				setData({
					cases: json[0].cases,
					todayCases: json[0].todayCases,
					deaths: json[0].deaths,
					todayDeaths: json[0].todayDeaths,
					recovered: json[0].recovered,
					active: json[0].active,
					critical: json[0].critical,
					casesPerOneMillion: json[0].casesPerOneMillion,
					deathsPerOneMillion: json[0].deathsPerOneMillion,
					tests: json[0].tests,
					testsPerOneMillion: json[0].testsPerOneMillion,
					affectedCountries: json[0].affectedCountries,
					createdAt: json[0].createdAt
				})
			})
			.catch( err => {
				console.log(err)
			});

	}, [])

	return(
		<section className="All">
			<div className="container">
				<div className="All__heading">
					<h3>Podatki za cel svet</h3>
					<span>Osveženo: {moment(data.createdAt).format("DD.MM.YYYY h:mm")}</span>
				</div>
				<div className="dataBoxes">
					<div className="dataBox">
						<span className="dataBox__overline">Vseh primerov</span>
						<span className="dataBox__number">{data.cases > 0 ? data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<div className="dataBox__divider"></div>
						<span className="dataBox__overline--small">Danes</span>
						<span className="dataBox__number-small negative">{data.todayCases > 0 ? '+' + data.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<FontAwesomeIcon icon={faViruses} className="dataBox__icon" />
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Aktivnih primerov</span>
						<span className="dataBox__number">{data.active > 0 ? data.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<div className="dataBox__divider"></div>
						<span className="dataBox__overline--small">Danes</span>
						<span className="dataBox__number-small negative">{data.todayActive > 0 ? '+' + data.todayActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<FontAwesomeIcon icon={faLungsVirus} className="dataBox__icon" />
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Okrevanih</span>
						<span className="dataBox__number">{data.recovered > 0 ? data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<div className="dataBox__divider"></div>
						<span className="dataBox__overline--small">Danes</span>
						<span className="dataBox__number-small negative">{data.todayRecovered > 0 ? '+' + data.todayRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<FontAwesomeIcon icon={faHandSparkles} className="dataBox__icon" />
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Smrti</span>
						<span className="dataBox__number">{data.deaths > 0 ? data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<div className="dataBox__divider"></div>
						<span className="dataBox__overline--small">Danes</span>
						<span className="dataBox__number-small negative">{data.todayDeaths > 0 ? '+' + data.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
						<FontAwesomeIcon icon={faAmbulance} className="dataBox__icon" />
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Kritičnih primerov</span>
						<span className="dataBox__number">{data.critical > 0 ? data.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Testiranih</span>
						<span className="dataBox__number">{data.tests > 0 ? data.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Testiranih na miljon ljudi</span>
						<span className="dataBox__number">{data.testsPerOneMillion > 0 ? data.testsPerOneMillion.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
					</div>
					<div className="dataBox">
						<span className="dataBox__overline">Prizadetih držav</span>
						<span className="dataBox__number">{data.affectedCountries > 0 ? data.affectedCountries.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default All;