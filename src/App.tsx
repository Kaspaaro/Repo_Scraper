import React, {useState} from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import SearchBar from './components/SearchBarElements/SearchBar';
import {ReactComponent as Logo} from './components/RepoScrapperLogo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CredentialsPopup from './components/Register_LoginContainer/CredentialsPopup';
import AuthButton_Container from './components/AuthenticateButtons/Container/AuthButton_Container';
import MainSideBarElement from './components/SideBar/SideBarComponents/MainSideBarElement';
import {
	AddToFavoritesContext,
	Context,
	LoginButtonContext,
	LoginTokenContext,
	NodeItemContext
} from './components/MyContext';
import RepoInfo from './components/InformationElement/RepoInfo';
const client = new ApolloClient({
	uri: `${process.env.GRAPHQL_SERVER}`,
	cache: new InMemoryCache(),
});
function App() {
	const [isOpen, _setIsOpen] = useState(false);
	const [mode, _setMode] = useState(false);
	const [url, setUrl] = useState('');
	const [desc, setDesc] = useState('');
	const [userToken, setUserToken] = useState('');
	const [username, setUsername] = useState('');
	const [click, setClick] = useState(false);
	const [node_id_Context, setNode_id_Context] = useState('');
	const [name_Context, setName_Context] = useState('');
	const [url_Context, setUrl_Context] = useState('');
	const [updated_at_Context, setUpdated_at_Context] = useState('');
	const [readmeOpen, setReadmeOpen] = useState(false);
	const handleOpen = (modeboolean:boolean) => {
		_setIsOpen(!isOpen);
		if (modeboolean) {
			_setMode(true);
		}else{
			_setMode(false);
		}
	};
	const handleUrlChange = (url: string) => {
		setUrl(url);
		setReadmeOpen(true);
	};
	const handleGetDescription = (description: string|undefined) => {
		if (description) {
			setDesc(description);
		}
	};

	const value = {isOpen,handleOpen,mode};

	return (
		<ApolloProvider client={client}>
			<>
				<div className="App">
					<header className="App-header">
						<LoginButtonContext.Provider value={{clickedFunction: async ()=>{}}}>
							<LoginTokenContext.Provider value={{userToken, setUserToken,username, setUsername}}>
								<AddToFavoritesContext.Provider value={{click, setClick}}>
									<NodeItemContext.Provider value={{
										node_id_Context,
										setNode_id_Context,
										name_Context,
										setName_Context,
										url_Context,
										setUrl_Context,
										updated_at_Context,
										setUpdated_at_Context
									}}>
										<Context.Provider value={value}>
											<CredentialsPopup/>
											<AuthButton_Container/>
										</Context.Provider>
										<Logo className="App-logo"/>
										<SearchBar onUrlChange={handleUrlChange} getDescription={handleGetDescription}/>
										<RepoInfo url={url} description={desc} readmeClicked={readmeOpen}/>
										<MainSideBarElement/>
									</NodeItemContext.Provider>
								</AddToFavoritesContext.Provider>
							</LoginTokenContext.Provider>
						</LoginButtonContext.Provider>
					</header>
				</div>

			</>


		</ApolloProvider>
	);
}

export default App;
