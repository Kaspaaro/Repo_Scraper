import React, {useContext, useState} from 'react';
import './SearchBarStyle.css';
import {SearchBarContext} from '../MyContext';
import {getRepositoriesByName} from '../../backend/api/github-queries/queries';
import ResultCarousel from '../CarouselElements/Carousel';
import RepoInfo from '../InformationElement/RepoInfo';
const SearchBar = ({onUrlChange,getDescription}:{

	onUrlChange: (url: string) => void,
	getDescription: (desc: string | undefined) => void}) =>
{

	const searchContext = useContext(SearchBarContext);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const sendInput = async  () => {
		const resultCarsousel = await getRepositoriesByName(inputValue.toLowerCase());
		searchContext.result = resultCarsousel.map((edge) => edge.node);
	};

	return (
		<>
			<SearchBarContext.Provider value={searchContext}>
				<div className={'searchBarContainer'}>
					<input
						className={'searchBar'}
						type="text"
						placeholder="Search..."
						onChange={handleInputChange}
					/>
					<select className={'filterButton'}>
						<option className={'filterOption'} value="Repos">Repositories</option>
						<option className={'filterOption'} value="Users">Users</option>
					</select>
				</div>
				<div className={'carouselHolder'}>
					<ResultCarousel handleClick={sendInput} handleSendUrl={onUrlChange} getDescription={getDescription}/>
				</div>
			</SearchBarContext.Provider>
		</>
	);
};

export default SearchBar;