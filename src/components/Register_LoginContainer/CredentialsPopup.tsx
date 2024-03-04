import React, {useEffect, useState} from 'react';
import './cssStyles/CredentialPopup.css';
import LoginSelecionButton from './Buttons/LoginSelectionButton';
import RegisterSelecionButton from './Buttons/RegisterSelectionButton';
import Register_Creds from './CredentialFields/Register_Creds';
import Login_Creds from './CredentialFields/Login_Creds';
type Props = {
	isOpen: boolean;
}
const CredentialsPopup = ({isOpen: isOpenProp}:Props) =>{

	const [isOpen, setIsOpen] = useState(isOpenProp);
	const [isLoginActive, setLoginActive] = useState(false);
	const [isRegisterActive, setRegisterActive] = useState(false);

	useEffect(()=>{
		setIsOpen(isOpenProp);
		setLoginActive(true);
		setRegisterActive(false);
	},[isOpenProp]);

	return isOpen ?(
		<>
			<div className={`registerContainer ${isOpen ? 'visible' : ''}`}>
				<LoginSelecionButton isActive={isLoginActive} setActive={() => {
					setLoginActive(!isLoginActive);
					if (!isLoginActive) {
						setRegisterActive(false);
					}}}/>
				<RegisterSelecionButton isActive={isRegisterActive} setActive={() => {
					setRegisterActive(!isRegisterActive);
					if (!isRegisterActive) {
						setLoginActive(false);
					}
				}}/>
				<div className={'cred_loginField'}>
					{isLoginActive && <Login_Creds/>}
					{isRegisterActive && <Register_Creds/>}
				</div>
			</div>
		</>
	) : null;
};
export default CredentialsPopup;