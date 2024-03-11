import React, {useContext} from 'react';
import {Context} from '../../MyContext';
const Signup_Button = () => {
	const context = useContext(Context);
	const clickopen = () => {
		context.handleOpen(false);
	};
	return (
		<>
			<button className={'registerButtonMainPage'} type={'button'} onClick={clickopen}>Signup</button>
		</>
	);
};
export default Signup_Button;