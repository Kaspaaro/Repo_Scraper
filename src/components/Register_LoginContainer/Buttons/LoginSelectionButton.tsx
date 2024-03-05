import React from 'react';
import '../cssStyles/CredentialPopup.css';
import CredentialSelectionButtonProps from '../Props/CredentialSelectionButtonProps';
const LoginSelecionButton = ({ isActive, setActive, Disabled }: CredentialSelectionButtonProps) =>{

	return(
		<>
			<svg className={'containerRegisterButton clickable'} onClick={Disabled ? undefined : ()=>setActive(!isActive)} xmlns="http://www.w3.org/2000/svg">
				<path fill={isActive ? '#1D2228' : '#212121'} d="M0 0H276L250 34L276 69H0V0Z"/>
				<text className={'containerButtonText'} dy={'2.6rem'} dx={'6.2rem'}>Login</text>
			</svg>


		</>
	);
};
export default LoginSelecionButton;