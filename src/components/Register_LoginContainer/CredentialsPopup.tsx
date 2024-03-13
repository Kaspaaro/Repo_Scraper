import React, {createContext, useContext, useEffect, useState} from 'react';
import './cssStyles/CredentialPopup.css';
import LoginSelecionButton from './Buttons/LoginSelectionButton';
import RegisterSelecionButton from './Buttons/RegisterSelectionButton';
import Register_Creds from './CredentialFields/Register_Creds';
import Login_Creds from './CredentialFields/Login_Creds';
import {Context} from '../MyContext';
type Props = {
	isOpen: boolean;
}
const CredentialsPopup = () =>{
	const value = useContext(Context);
	const [isOpen, setIsOpen] = useState(value.isOpen);
	const [isLoginActive, setLoginActive] = useState(false);
	const [isRegisterActive, setRegisterActive] = useState(false);
	const [isDisabledLogin, setDisabledLogin] = useState(false);
	const [isDisabledRegister, setDisabledRegister] = useState(false);

	useEffect(()=>{
		console.log('value',value);
		setIsOpen(value.isOpen);
		if (value.mode) {
			setLoginActive(true);
			setRegisterActive(false);
		}else{
			setLoginActive(false);
			setRegisterActive(true);
		}
	},[value.isOpen]);

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