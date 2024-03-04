import React from 'react';
import '../cssStyles/RegisterContainerStyle.css';
const Register_Creds = () => {
	return (
		<div>
			<form className={'registerCredsForm'}>
				<input className={'usernameRegisterInput'} type="text" placeholder="Username"/>
				<input className={'emailRegisterInput'} type="email" placeholder="Email"/>
				<input className={'passwordRegisterInput'} type="password" placeholder="Password"/>
				<input className={'confirmPasswordRegisterInput'} type="password" placeholder="Confirm Password"/>
				<button className={'registerButtonCreds'}>Register</button>
			</form>
		</div>
	);
};
export default Register_Creds;