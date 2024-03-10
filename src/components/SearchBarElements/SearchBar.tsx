import React from 'react';
import './SearchBarStyle.css';
const SearchBar = () => {
	return(
		<>
			<input className={'searchBar'} type="text" placeholder="Search..."/>
			<select className={'filterButton'}>
				<option className={'filterOption'} value="Repos">Repositories</option>
				<option className={'filterOption'} value="Users">Users</option>
			</select>
		</>
	);
};
export default SearchBar;