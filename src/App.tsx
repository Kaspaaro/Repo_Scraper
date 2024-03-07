import React from 'react';
import './App.css';
import CredentialsPopup from './components/Register_LoginContainer/CredentialsPopup';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
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
						<CredentialsPopup isOpen={true}/>
					</header>
				</div>
			</>
		</ApolloProvider>
	);
}

export default App;
