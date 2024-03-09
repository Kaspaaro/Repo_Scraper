import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import MarkdownTestFunc from './frontend/MarkdownTestPage';
import SearchBar from './components/SearchBarElements/SearchBar';
import {ReactComponent as Logo} from './components/RepoScrapperLogo.svg';

const client = new ApolloClient({
	uri: `${process.env.GRAPHQL_SERVER}`,
	cache: new InMemoryCache(),
});
function App() {
	return(
		<ApolloProvider client={client}>
			<>
				<div className="App">
					<header className="App-header">
						<Logo className="App-logo"/>
						<div className={'searchBarContainer'}>
							<SearchBar/>
						</div>
					</header>
				</div>
			</>
		</ApolloProvider>
	);
}

export default App;
