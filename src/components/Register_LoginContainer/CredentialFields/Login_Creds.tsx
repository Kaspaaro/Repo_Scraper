import React, {useState} from 'react';
import '../cssStyles/LoginContainerStyle.css';
import UserResolver from '../../../backend/api/resolvers/userResolver';
const Login_Creds = () => {
	const [credentials, setCredentials] = useState({  password: '', username: '' });

	const handleLogin = async () =>  {
		UserResolver.Mutation.login( undefined,{credentials: credentials}).then(r => console.log(r));
	};
	const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<form className={'loginCredsForm'}>
				<input className={'usernameLoginInput'} name="username" onChange={handleInputChange} type="text" placeholder="Email"/>
				<input className={'passwordLoginInput'} name="password" onChange={handleInputChange} type="password" placeholder="Password"/>
			</form>
			<button className={'loginButtonCreds'} type={'button'} onClick={handleLogin}>Login</button>
			<div className={'externalLoginField'}>
				<button className={'googleLoginButtonCreds'} type={'button'}>Login - Google</button>
				<button className={'githubLoginButtonCreds'} type={'button'}>Login - GitHub</button>
			</div>
		</div>
	);
};
export default Login_Creds;