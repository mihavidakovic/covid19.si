import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Unsplash from 'react-unsplash-wrapper';


import Header from '../components/Header/Header';
import All from '../components/All/All';

import List from '../components/List/List';


export default function Drzava(props) {
	const [CountryInfo, setCountryInfo] = useState({});

	useEffect(() => {

	}, [])
	const nameSlo = props.location.state.nameSlo;
	const name = props.location.state.name;
	

	return (
		<>
			<Header expanded={false} />
			<div className="country__popup">
				<div className="country__popup--overlay">
				</div>
				<Unsplash className="country__popup--img" width="1600" height="700" keywords={name + ",nature"} img expand />
			</div>
			 
		</>
	);
}