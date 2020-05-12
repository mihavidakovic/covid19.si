import React, { useState, useEffect, createContext } from 'react';


import './assets/style/style.scss';

import Header from './components/Header/Header';
import All from './components/All/All';

function App() {


	useEffect(() => {
		function getAllData() {
		}

		getAllData();

	}, [])


	return (
		<div className="App">
			<Header />
			<All />
		</div>
	);
}

export default App;
