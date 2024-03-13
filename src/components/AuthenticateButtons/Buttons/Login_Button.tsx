import React, {useContext} from 'react';
import {Context} from '../../MyContext';
const Login_Button = () => {
	const context = useContext(Context);
	const clickopen = () => {
		context.handleOpen(true);
	};
	return (
		<>
			<button className={'loginButtonMainPage'} type={'button'} onClick={clickopen}>Login</button>
		</>
	);
};
export default Login_Button;