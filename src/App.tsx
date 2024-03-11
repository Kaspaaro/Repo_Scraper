import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import MarkdownTestFunc from './frontend/MarkdownTestPage';
import SearchBar from './components/SearchBarElements/SearchBar';
import {ReactComponent as Logo} from './components/RepoScrapperLogo.svg';
import RepoCard from './components/CarouselElements/RepoCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CredentialsPopup from './components/Register_LoginContainer/CredentialsPopup';
import ResultCarousel from './components/CarouselElements/Carousel';
import Login_Button from './components/AuthenticateButtons/Buttons/Login_Button';
import Signup_Button from './components/AuthenticateButtons/Buttons/Signup_Button';
import AuthButton_Container from './components/AuthenticateButtons/Container/AuthButton_Container';
import MainSideBarElement from './components/SideBar/SideBarComponents/MainSideBarElement';

const client = new ApolloClient({
	uri: `${process.env.GRAPHQL_SERVER}`,
	cache: new InMemoryCache(),
});
function App() {
	return(
		<ApolloProvider client={client}>
			<>
				<div className="App">
					<MainSideBarElement/>
					<header className="App-header">
						<AuthButton_Container/>
						<Logo className="App-logo"/>

						<div className={'searchBarContainer'}>
							<SearchBar/>
						</div>
						<div className={'carouselHolder'}>
							<ResultCarousel/>
						</div>

					</header>
				</div>
			</>
		</ApolloProvider>
	);
}

export default App;
