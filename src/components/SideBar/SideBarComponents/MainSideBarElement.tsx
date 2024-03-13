import React, {useEffect, useState} from 'react';
import {ReactComponent as SideBarButton} from '../svgElements/ButtonHalfCircle.svg';
import '../Styles/SideBar.css';
const MainSideBarElement = () =>{
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () =>{
		console.log('clicked');
		setIsOpen(!isOpen);
	};


	return(
		<div className={`sidebarContent ${isOpen ? 'opensidebar' : ''}`}>
			<SideBarButton className={'sidebarButton clickable'} onClick={()=>{handleOpen();}}/>
			<div className={'userDetails'}>
				<h5 className={'userNameDisplay'}>Visitor</h5>
			</div>

			<h6 className={'favRepoTitle'}>Favorite Repositories</h6>

			<div className={'favoriteRepos'}>
				<div className={'repoItem'}>
					<h6 className={'repoName'}>Repo 1</h6>
				</div>
				<div className={'repoItem'}>
					<h6 className={'repoName'}>Repo 2</h6>
				</div>
				<div className={'repoItem'}>
					<h6 className={'repoName'}>Repo 3</h6>
				</div>
			</div>
		</div>
			
		
	);
};
export default MainSideBarElement;