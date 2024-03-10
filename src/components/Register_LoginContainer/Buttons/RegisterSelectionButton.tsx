import React from 'react';
import '../cssStyles/CredentialPopup.css';
import CredentialSelectionButtonProps from '../Props/CredentialSelectionButtonProps';

//RegisterSelecionButton component for registering an account and opening the register form.
const RegisterSelecionButton = ({ isActive, setActive, Disabled }: CredentialSelectionButtonProps) =>{
	return (
		<>
			<svg className={'containerTopButtons clickable'} onClick={Disabled ? undefined : ()=>setActive(!isActive)} xmlns="http://www.w3.org/2000/svg">
				<path fill={isActive ? '#1D2228' : '#212121'} d="M276 0H0L26 34L0 69H276V0Z"/>
				<text className={'containerButtonText'} dy={'2.6rem'} dx={'4.5rem'} >Registeration</text>
			</svg>
		</>
	);
};
export default RegisterSelecionButton;