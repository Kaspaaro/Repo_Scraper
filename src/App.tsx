import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import MarkdownTestFunc from './frontend/MarkdownTestPage';
import SearchBar from './components/SearchBarElements/SearchBar';
import {ReactComponent as Logo} from './components/RepoScrapperLogo.svg';
import RepoCard from './components/CarouselElements/RepoCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CredentialsPopup from './components/Register_LoginContainer/CredentialsPopup';
import ResultCarousel from './components/CarouselElements/Carousel';
import AuthButton_Container from './components/AuthenticateButtons/Container/AuthButton_Container';
import MainSideBarElement from './components/SideBar/SideBarComponents/MainSideBarElement';
import {Context} from './components/MyContext';
import RepoInfo from './components/InformationElement/RepoInfo';
const client = new ApolloClient({
	uri: `${process.env.GRAPHQL_SERVER}`,
	cache: new InMemoryCache(),
});
function App() {
	const [isOpen, _setIsOpen] = useState(false);
	const [mode, _setMode] = useState(false);
	const handleOpen = (modeboolean:boolean) => {
		_setIsOpen(!isOpen);
		if (modeboolean) {
			_setMode(true);
		}else{
			_setMode(false);
		}
	};


	const value = {isOpen,handleOpen,mode};

	return (
		<ApolloProvider client={client}>
			<>

				<div className="App">

					<header className="App-header">
						<Context.Provider value={value}>
							<CredentialsPopup/>
							<AuthButton_Container/>
						</Context.Provider>

						<Logo className="App-logo"/>

						<div className={'searchBarContainer'}>
							<SearchBar/>
						</div>
						<div className={'carouselHolder'}>
							<ResultCarousel/>
						</div>
						<RepoInfo/>
						<MainSideBarElement/>
					</header>

				</div>

			</>


		</ApolloProvider>
	);
}

export default App;
