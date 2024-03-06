import React, {useEffect, useState} from 'react';
import '../cssStyles/RegisterContainerStyle.css';
import {doGraphQLFetch} from '../../../backend/api/fetchFunctions/fetch';
import registerquery from '../../../backend/api/fetchFunctions/queries';
const Register_Creds = () => {
	const [isClicked, setIsClicked] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	
	useEffect(() => {
		if (confirmPassword === password) {
			const credentials = {
				user: {
					user_name: username,
					password: password,
					email: email,
				}
			};
			const apiURL: string = process.env.REACT_APP_GRAPHQL_SERVER as string;
			console.log('API URL OMG ', apiURL);
			if (isClicked) {
				console.log('REGISTER GRAPHQL ' + apiURL + '\n'
					+ 'Credentials: ' + credentials.user.email +' '+ credentials.user.user_name+ ' '+credentials.user.password + '\n' + 'Register Query: ' + registerquery);

				try {
					const register =  doGraphQLFetch(apiURL, registerquery, credentials);
					register.then(async (res)  =>{
						console.log(res);});
					alert('Registered');
				} catch (er) {
					console.log(er);
				}
			}
		}else{
			alert('Passwords do not match');
		}
	}, [isClicked]);

	return (
		<div>
			<form className={'registerCredsForm'}>
				<input className={'usernameRegisterInput'} type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
				<input className={'emailRegisterInput'} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
				<input className={'passwordRegisterInput'} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
				<input className={'confirmPasswordRegisterInput'} type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
			</form>
			<button className={'registerButtonCreds'} onClick={() => setIsClicked(true)}>Register</button>
			<div className={'externalRegisterField'}>
				<button className={'googleRegisterButtonCreds'}>Register - Google</button>
				<button className={'githubRegisterButtonCreds'}>Register - GitHub</button>
			</div>
		</div>
	);
};
export default Register_Creds;