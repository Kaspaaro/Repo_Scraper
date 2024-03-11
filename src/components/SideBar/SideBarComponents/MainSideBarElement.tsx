import React, {useEffect, useState} from 'react';
import {ReactComponent as SideBarButton} from '../svgElements/ButtonHalfCircle.svg';
import '../Styles/SideBar.css';
const MainSideBarElement = () =>{
	const [isOpen, setIsOpen] = useState(true);
	const handleOpen = () =>{
		console.log('clicked');
		setIsOpen(!isOpen);
	};


	return(
		<>
			<div className={'sidebarContainer'}>
				<div className={`sidebarContent ${isOpen ? 'open' : ''}`}>
					<SideBarButton className={'sidebarButton clickable'} onClick={()=>{handleOpen();}}/>
				</div>

			</div>
		</>
	);
};
export default MainSideBarElement;