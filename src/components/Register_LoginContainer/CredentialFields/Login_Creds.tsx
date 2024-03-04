import React from 'react';
import '../cssStyles/LoginContainerStyle.css';
const Login_Creds = () => {
	return (
		<div>
			<form className={'loginCredsForm'}>
				<input className={'usernameLoginInput'} type="text" placeholder="Username" />
				<input className={'passwordLoginInput'} type="password" placeholder="Password" />
				<button className={'loginButtonCreds'}>Login</button>
			</form>
		</div>
	);
};
export default Login_Creds;