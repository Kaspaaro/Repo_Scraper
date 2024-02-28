import React, {useEffect} from 'react';
import '../../styles/RegisterPopup.css';
import LoginSelecionButton from './Buttons/LoginSelectionButton';
import RegisterSelecionButton from './Buttons/RegisterSelectionButton';
interface Props {
	isOpen: boolean;
}
const CredentialsPopup = ({isOpen: isOpenProp}:Props) =>{
	const [isOpen, setIsOpen] = React.useState(isOpenProp);

	useEffect(()=>{
		setIsOpen(isOpenProp);
	},[isOpenProp]);

	return isOpen ?(
		<div className={`registerContainer ${isOpen ? 'visible' : ''}`}>
			<LoginSelecionButton/>
			<RegisterSelecionButton/>
		</div>
	) : null;
};
export default CredentialsPopup;