import React, { useState, useEffect, useContext } from "react";

function SelectedCountry(){

	// let countryInfo = useContext(currentCountry);

	let [countryInfo, setCountryInfo] = useState({
		selectedCountry: {}
	});

	let [countryData, setCountryData] = useState({
		countryData: {}
	});

	useEffect(() => {
		function getAllData() {
			fetch(process.env.REACT_APP_API_URL + "/country/36/get")
				.then( response => {
					if (!response.ok) { throw response }
					return response.json()  //we only get here if there is no error
				})
				.then( json => {
					setCountryInfo({selectedCountry: json[0]})
					console.log(json[0])
					const url = 'https://disease.sh/v2/countries/'+ json[0].name +'?yesterday=false&strict=true';
					return fetch(url)
				})
				.then(response => {
					return response.json();
				})
				.then(data => {
					setCountryData({countryData: data})
					return false;
				})
				.catch( err => {
					console.log(err)
				});
		}

		getAllData();

	}, [])
	let country = countryInfo.selectedCountry;
	let data = countryData.countryData;


	return (

		<div className="Hedaer--main__country">
			<div className="country--top">
				<div className="country--top__flag">
					<img src={data.countryInfo ? data.countryInfo.flag : ''} />
					<span className={data.countryInfo ? '' : 'loading-content'}></span>
				</div>
				<span className="country--top__name">{country.prevod ? country.prevod : <span className="loading-content"></span>}</span>
			</div>
			<div className="country--info">
				<div className="country--info__point">
					<span className="point--title">Vseh primerov</span>
					<span className="point--number">{data.cases >= 0 ? data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '94px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Aktivnih primerov</span>
					<span className="point--number">{data.active >= 0 ? data.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '62px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Kritičnih</span>
					<span className="point--number">{data.critical >= 0 ? data.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '54px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Okrevanih</span>
					<span className="point--number">{data.recovered >= 0 ? data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '71px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Testiranih</span>
					<span className="point--number">{data.tests >= 0 ? data.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '88px'}}></span>}</span>
				</div>
				<div className="country--info__point">
					<span className="point--title">Smrti</span>
					<span className="point--number">{data.deaths >= 0 ? data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : <span className="loading-content" style={{width: '92px'}}></span>}</span>
				</div>
			</div>
		</div>
	);

}

export default SelectedCountry;