import React, {useEffect, useState} from 'react';
import '../cssStyles/CredentialPopup.css';

const RegisterSelecionButton = () =>{
	const [isActive, setActive] = useState(false);

	useEffect(()=>{
		if(isActive){
			setActive(false);
		}
	},[isActive]);

	return (
		<>
			<svg className={'containerRegisterButton clickable'} onClick={() => setActive(true)} xmlns="http://www.w3.org/2000/svg">
				<path d="M276 0H0L26 34L0 69H276V0Z"/>
				<text className={'containerButtonText'} dy={'2.6rem'} dx={'4.5rem'} >Registeration</text>
			</svg>
		</>
	);
};
export default RegisterSelecionButton;