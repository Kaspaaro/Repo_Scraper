import React, {useContext, useState} from 'react';
import './SearchBarStyle.css';
import {SearchBarContext} from '../MyContext';
import {getRepositoriesByName} from '../../backend/api/github-queries/queries';

const SearchBar = () => {
	const searchContext = useContext(SearchBarContext);
	const [inputValue, setInputValue] = useState('');

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			sendInput();
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const sendInput = async () => {
		const result = await getRepositoriesByName(inputValue.toLowerCase());

	};

	return (
		<>
			<input
				className={'searchBar'}
				type="text"
				placeholder="Search..."
				onKeyDown={handleKeyPress}
				onChange={handleInputChange}
			/>
			<select className={'filterButton'}>
				<option className={'filterOption'} value="Repos">Repositories</option>
				<option className={'filterOption'} value="Users">Users</option>
			</select>
		</>
	);
};

export default SearchBar;