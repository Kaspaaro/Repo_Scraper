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
	const [isDisabledLogin, setDisabledLogin] = useState(false);
	const [isDisabledRegister, setDisabledRegister] = useState(false);

	useEffect(()=>{
		setIsOpen(isOpenProp);
		setLoginActive(true);
		setRegisterActive(false);
	},[isOpenProp]);

	useEffect(() => {
		if (isLoginActive) {
			setDisabledLogin(true);
			setDisabledRegister(false);
		}else{
			setDisabledLogin(false);
			setDisabledRegister(true);
		}
	}, [isLoginActive,isRegisterActive]);

	return isOpen ?(
		<>
			<div className={`credentialContainer ${isOpen ? 'visible' : ''}`}>
				<LoginSelecionButton isActive={isLoginActive} setActive={() => {
					setLoginActive(!isLoginActive);
					if (!isLoginActive) {
						setRegisterActive(false);
					}}} Disabled={isDisabledLogin}/>
				<RegisterSelecionButton isActive={isRegisterActive} setActive={() => {
					setRegisterActive(!isRegisterActive);
					if (!isRegisterActive) {
						setLoginActive(false);
					}
				}} Disabled={isDisabledRegister}/>
				<div className={'cred_loginField'}>
					{isLoginActive && <Login_Creds/>}
					{isRegisterActive && <Register_Creds/>}
				</div>
			</div>
		</>
	) : null;
};
export default CredentialsPopup;