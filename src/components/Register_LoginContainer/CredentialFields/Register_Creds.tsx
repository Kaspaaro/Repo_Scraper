import React, { useState } from 'react';
import userResolver from '../../../backend/api/resolvers/userResolver';
import '../cssStyles/RegisterContainerStyle.css';
const Register_Creds = () => {
	const [credentials, setCredentials] = useState({ user_name: '', password: '', email: '' });
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = () => {
		if (credentials.password === confirmPassword && credentials.password.length > 4) {
			console.log('credentials !!', credentials);
			userResolver.Mutation.register( undefined,{user: credentials}).then(r => console.log(r));
		} else {
			alert('Passwords do not match or are less than 5 characters long');
		}
	};

	const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<form>
				<input className={'usernameRegisterInput'} name="user_name" type="text" onChange={handleInputChange} placeholder="Username" />
				<input className={'emailRegisterInput'} name="email" type="email" onChange={handleInputChange} placeholder="Email" />
				<input className={'passwordRegisterInput'} name="password" type="password" onChange={handleInputChange} placeholder="Password" />
				<input className={'confirmPasswordRegisterInput'} name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
			</form>
			<button className={'registerButtonCreds'} type={'button'} onClick={handleRegister}>Register</button>
			<div className={'externalRegisterField'}>
				<button className={'googleRegisterButtonCreds'} type={'button'}>Register - Google</button>
				<button className={'githubRegisterButtonCreds'} type={'button'}>Register - GitHub</button>
			</div>
		</div>
	);
};

export default Register_Creds;