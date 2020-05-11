import React, { useState, useEffect, createContext } from 'react';


import './assets/style/style.scss';

import Header from './components/Header/Header';

function App() {


	useEffect(() => {
		function getAllData() {
		}

		getAllData();

	}, [])


	return (
		<div className="App">
			<Header />
		</div>
	);
}

export default App;
