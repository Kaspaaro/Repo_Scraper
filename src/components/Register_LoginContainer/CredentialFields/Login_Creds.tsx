import React, {useContext, useState} from 'react';
import '../cssStyles/LoginContainerStyle.css';
import UserResolver from '../../../backend/api/resolvers/userResolver';
import {ClosePopupOnLogin, LoginButtonContext, LoginTokenContext} from '../../MyContext';
const Login_Creds = () => {
	const [credentials, setCredentials] = useState({  password: '', username: '' });
	const {userToken,username, setUserToken,setUsername} = useContext(LoginTokenContext);
	const contextForLoginButton = useContext(LoginButtonContext);
	const {closePopup, setClosePopup} = useContext(ClosePopupOnLogin);
	const handleLogin = async () =>  {
		try {
			await UserResolver.Mutation.login( undefined,{credentials: credentials}).then(r => {setUserToken(r.token); setUsername(r.user.user_name);});
			contextForLoginButton.clickedFunction();
		}catch (e) {
			alert('Invalid Credentials');
			console.log('Invalid Credentials');
		}
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
			<button className={'loginButtonCreds'} type={'button'} onClick={()=>{handleLogin();setClosePopup(true);}}>Login</button>
			<div className={'externalLoginField'}>
				<button className={'googleLoginButtonCreds'} type={'button'}>Login - Google</button>
				<button className={'githubLoginButtonCreds'} type={'button'}>Login - GitHub</button>
			</div>
		</div>
	);
};
export default Login_Creds;