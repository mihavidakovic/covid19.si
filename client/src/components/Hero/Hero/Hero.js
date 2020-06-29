import React, { useState, useEffect, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'

import SelectedCountry from '../SelectedCountry';

import WorldMap from '../map/WorldMap';

function Hero() {

	const [selectedCountry, setSelectedCountry] = useState({id: 705});
	const [NameTooltip, setNameTooltip] = useState({countryName: "slovenija"})

	function handleChange(newId, countryName) {
		setSelectedCountry({id: newId, countryName: countryName})
	}

	function handleNameChange(countryName) {
		setNameTooltip({ountryName: countryName})
	}


	return(
		<>
			<div className="Hedaer--main__map">
				<WorldMap id={selectedCountry.id} name={selectedCountry.name} onChange={handleChange} />
			</div>
			<SelectedCountry id={selectedCountry.id} />
		</>

	)
}

export default Hero;