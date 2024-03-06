import React from 'react';
import '../cssStyles/LoginContainerStyle.css';
const Login_Creds = () => {
	return (
		<div>
			<form className={'loginCredsForm'}>
				<input className={'usernameLoginInput'} type="text" placeholder="Username"/>
				<input className={'passwordLoginInput'} type="password" placeholder="Password"/>
			</form>
			<button className={'loginButtonCreds'}>Login</button>
			<div className={'externalLoginField'}>
				<button className={'googleLoginButtonCreds'}>Login - Google</button>
				<button className={'githubLoginButtonCreds'}>Login - GitHub</button>
			</div>
		</div>
	);
};
export default Login_Creds;