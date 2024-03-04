import React, {useEffect, useState} from 'react';
import './cssStyles/CredentialPopup.css';
import LoginSelecionButton from './Buttons/LoginSelectionButton';
import RegisterSelecionButton from './Buttons/RegisterSelectionButton';
import Register_Creds from './CredentialFields/Register_Creds';
type Props = {
	isOpen: boolean;
}
const CredentialsPopup = ({isOpen: isOpenProp}:Props) =>{

	const [isOpen, setIsOpen] = useState(isOpenProp);
	const [isLoginActive, setLoginActive] = useState(false);
	useEffect(()=>{
		setIsOpen(isOpenProp);
	},[isOpenProp]);
	useEffect(() => {
		console.log('Login button clicked in cre' + isLoginActive);
	}, [isLoginActive]);
	return isOpen ?(
		<>
			<div className={`registerContainer ${isOpen ? 'visible' : ''}`}>
				<LoginSelecionButton isActive={isLoginActive} setActive={setLoginActive}/>
				<RegisterSelecionButton/>
				<div className={'cred_loginField'}>
					<Register_Creds/>
				</div>
			</div>
		</>
	) : null;
};
export default CredentialsPopup;