import React, { useState, useEffect, useContext } from "react";
import {
  Link,
} from "react-router-dom";

function SelectedCountry(props){

	// let countryInfo = useContext(currentCountry);

	let [isLoading, setIsLoading] = useState(true);

	let [countryInfo, setCountryInfo] = useState({
		selectedCountry: {}
	});

	let [countryData, setCountryData] = useState({
		countryData: {}
	});

	function getAllData(id) {
		fetch(process.env.REACT_APP_API_URL + "/country/"+ id +"/get")
			.then( response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then( json => {
				setCountryInfo({selectedCountry: json[0]})
				const url = 'https://disease.sh/v2/countries/'+ json[0].name +'?yesterday=false&strict=true';
				return fetch(url)
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				setCountryData({countryData: data})
				setIsLoading(false)
				return false;
			})
			.catch( err => {
				console.log(err)
			});
	}

	useEffect(() => {

		getAllData(props.id);


	}, [props])

	let country = countryInfo.selectedCountry;
	let data = countryData.countryData;
	let loading = isLoading;
	let countryFlag = data.countryInfo;

	return (

		<div className="Hedaer--main__country">
			<div className="country--top">
				{country ? 
					<>
						<div className="country--top__flag">
							{data.countryInfo ? <div className="flagContainer" style={{backgroundImage: "url(" + countryFlag.flag + ")"}}></div> : ''}
							<span className={data.countryInfo ? '' : 'loading-content'}></span>
						</div>
						<span className="country--top__name">{country.prevod ? country.prevod : <span className="loading-content"></span>}</span>
					</> : 
					<>
						<div className="country--top__flag">
							<img src="/img/flags/unknown.png" />
						</div>
						<span className="country--top__name">Ni podatka</span>
					</>}
			</div>

			<div className="country--info">
				<div className="country--info__point">
					<span className="point--title">Vseh primerov</span>
					<span className="point--number">{data.cases >= 0 ? data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
					<div className="point__divider"></div>
					<span className="point--title__small">Danes</span>
					<span className={data.todayCases > 0 ? "point--number__small negative" : "point--number__small"}>{data.todayCases >= 0 ? "+" + data.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Aktivnih primerov</span>
					<span className="point--number">{data.active >= 0 ? data.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '62px'}}></span>}</span>
					<div className="point__divider"></div>
					<span className="point--title__small">Danes</span>
					<span className="point--number__small">{data.active >= 0 ? "+" + data.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Smrti</span>
					<span className="point--number">{data.deaths >= 0 ? data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '92px'}}></span>}</span>
					<div className="point__divider"></div>
					<span className="point--title__small">Danes</span>
					<span className={data.todayCases > 0 ? "point--number__small negative" : "point--number__small positive"}>{data.todayDeaths >= 0 ? "+" + data.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Okrevanih</span>
					<span className="point--number">{data.recovered >= 0 ? data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '71px'}}></span>}</span>
					<div className="point__divider"></div>
					<span className="point--title__small">Danes</span>
					<span className={data.todayCases > 0 ? "point--number__small positive" : "point--number__small"}>{data.todayRecovered >= 0 ? "+" + data.todayRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Kritičnih</span>
					<span className="point--number">{data.critical >= 0 ? data.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '54px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Testiranih</span>
					<span className="point--number">{data.tests >= 0 ? data.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '88px'}}></span>}</span>
				</div>
			</div>
			<div className="country__more-info">
				<Link to={{
						pathname: (country.prevod ? "/drzava/" + country.slug : "/drzava/"),
						state: {
							name: country.name,
							nameSlo: (country.prevod ? country.prevod : "ok")
						}
					}}>
					Več podatkov o <b>{country.prevod ? country.prevod : <span className="loading-content"></span>}</b>
				</Link>
			</div>
		</div>
	);

}

export default SelectedCountry;