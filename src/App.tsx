import React from 'react';
import './App.css';
import CredentialsPopup from './components/Register_LoginContainer/CredentialsPopup';
//FIX
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<CredentialsPopup isOpen={true}/>
			</header>
		</div>
	);
}

export default App;
