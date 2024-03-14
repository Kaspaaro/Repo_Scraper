import React, {useContext, useEffect, useState} from 'react';
import './cssStyles/CredentialPopup.css';
import LoginSelecionButton from './Buttons/LoginSelectionButton';
import RegisterSelecionButton from './Buttons/RegisterSelectionButton';
import Register_Creds from './CredentialFields/Register_Creds';
import Login_Creds from './CredentialFields/Login_Creds';
import {ClosePopupOnLogin, Context} from '../MyContext';
import {Button} from 'react-bootstrap';
const CredentialsPopup = () =>{
	const handleOpenValue = useContext(Context);
	const {closePopup, setClosePopup} = useContext(ClosePopupOnLogin);
	const [isOpen, setIsOpen] = useState(handleOpenValue.isOpen);
	const [isLoginActive, setLoginActive] = useState(false);
	const [isRegisterActive, setRegisterActive] = useState(false);
	const [isDisabledLogin, setDisabledLogin] = useState(false);
	const [isDisabledRegister, setDisabledRegister] = useState(false);

	useEffect(()=>{
		setIsOpen(handleOpenValue.isOpen);
		if (handleOpenValue.mode) {
			setLoginActive(true);
			setRegisterActive(false);
		}else{
			setLoginActive(false);
			setRegisterActive(true);
		}
		if (closePopup) {
			setIsOpen(false);
			handleOpenValue.handleOpen(false);
			setClosePopup(false);
		}
	},[handleOpenValue.isOpen,closePopup]);

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
				<Button className={'closeButton'} onClick={()=>handleOpenValue.handleOpen(false)}>x</Button>
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