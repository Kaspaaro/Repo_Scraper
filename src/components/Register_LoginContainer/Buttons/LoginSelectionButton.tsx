import React from 'react';
import '../../../styles/RegisterPopup.css';

const LoginSelecionButton = () =>{

	return(
		<>
			<svg className={'containerRegisterButton'} xmlns="http://www.w3.org/2000/svg">
				<path d="M0 0H276L250 34L276 69H0V0Z"/>
				<text className={'containerButtonText'} dy={'2.6rem'} dx={'6.2rem'}>Login</text>
			</svg>


		</>
	);
};
export default LoginSelecionButton;