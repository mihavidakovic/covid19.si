import React, { useState, useEffect } from 'react';
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table'


export default function List() {

	const [CountriesList, setCountriesList] = useState({
		data: {}
	})

	useEffect(() => {
		fetch("https://disease.sh/v2/countries?yesterday=false&sort=cases&allowNull=false")
			.then( response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then( json => {
				setCountriesList({
					data: json
				})
			})
			.catch( err => {
				console.log(err)
			});
	}, [])


	return (
		<div className="countryList">
		</div>
	)

}