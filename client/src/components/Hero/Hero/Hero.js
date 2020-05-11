import React, { useState, useEffect, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'

import HeroProvider from '../HeroProvider';

import SelectedCountry from '../SelectedCountry';
import WorldMap from '../map/WorldMap';

function Hero() {
	return(
		<HeroProvider.Consumer>
			{activeCountry => (
				<>
					<div className="Hedaer--main__map">
						<WorldMap id={{selectedId: activeCountry.id}}/>
					</div>
					<SelectedCountry id={activeCountry.id} />
				</>
			)}
		</HeroProvider.Consumer>

	)
}

export default Hero;