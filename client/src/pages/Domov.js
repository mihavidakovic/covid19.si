import React, { useState, useEffect, createContext } from 'react';

import Header from '../components/Header/Header';
import All from '../components/All/All';

import List from '../components/List/List';

export default function Domov() {


	return (
		<>
			<Header expanded={true} />
			<All />
			<List />
		</>
	);
}