import React from 'react';
import '../../../styles/RegisterPopup.css';

const RegisterSelecionButton = () =>{

	return (
		<>
			<svg className={'containerRegisterButton'} xmlns="http://www.w3.org/2000/svg">
				<path d="M276 0H0L26 34L0 69H276V0Z"/>
				<text className={'containerButtonText'} dy={'2.6rem'} dx={'4.5rem'} >Registeration</text>
			</svg>
		</>
	);
};
export default RegisterSelecionButton;