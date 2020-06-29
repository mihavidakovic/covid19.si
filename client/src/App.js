import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './assets/style/style.scss';

import Domov from './pages/Domov';
import Drzava from './pages/Drzava';

function App() {
	const [darkMode, setDarkMode] = useState(getInitialMode());

	function getInitialMode() {
		const isReturningUser = 'dark' in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		const userPrefersDark = getPrefColorScheme();

		if (isReturningUser) {
			return savedMode
		} else if (userPrefersDark) {
			return true;
		} else {
			return false;
		}
	}

	function getPrefColorScheme() {
		if (!window.matchMedia) return;

		return window.matchMedia('(prefers-color-scheme: dark)');
	}

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));

	}, [darkMode])


	return (
		<div className={darkMode ? "App darkMode" : "App darkMode"}>
			<Switch>
				<Route exact path="/" render={Domov} />
				<Route exact path="/drzava/:name" render={Drzava} />
			</Switch>
		</div>
	);
}

export default App;
