import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import MarkdownTestFunc from './frontend/MarkdownTestPage';

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
					</header>
					<MarkdownTestFunc/>
				</div>
			</>
		</ApolloProvider>
	);
}

export default App;
