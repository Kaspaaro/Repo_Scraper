import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as SideBarButton} from '../svgElements/ButtonHalfCircle.svg';
import '../Styles/SideBar.css';
import {Col, Container, Row, Stack } from 'react-bootstrap';
import {doGraphQLFetch} from '../../../backend/api/graphQL-queries/doGraphQLFetch';
import {addRepository} from '../../../backend/api/graphQL-queries/queries';
import randomstring from 'randomstring';
import {AddToFavoritesContext, LoginTokenContext, NodeItemContext} from '../../MyContext';
const MainSideBarElement = () =>{
	const [isOpen, setIsOpen] = useState(false);
	const {userToken, setUserToken,username, setUsername} = useContext(LoginTokenContext);
	const {click, setClick} = useContext(AddToFavoritesContext);
	const {owner_Context,name_Context,node_id_Context,url_Context,updated_at_Context, setOwner_Context,setName_Context,setNode_id_Context,setUpdated_at_Context,setUrl_Context} = useContext(NodeItemContext);
	const vars = {
		input: {
			node_id: node_id_Context,
			name: name_Context ,
			url: url_Context,
			updated_at: new Date(updated_at_Context),
		},
	};
	const fetchRepository = async () => {
		console.log('TOKEN',userToken);
		await doGraphQLFetch('http://localhost:3001/graphql',addRepository,vars,userToken);
	};
	const handleOpen = () =>{
		console.log('clicked');
		setIsOpen(!isOpen);
	};
	useEffect(()=>{
		if (click) {
			console.log('VARS',vars);
			fetchRepository();
		}
	},[click]);


	return(
		<div className={`sidebarContent ${isOpen ? 'opensidebar' : ''}`}>
			<SideBarButton className={'sidebarButton clickable'} onClick={()=>{handleOpen();}}/>
			<div className={'userDetails'}>
				<h5 className={'userNameDisplay'}>{username}</h5>
			</div>

			<h6 className={'favRepoTitle'}>Favorite Repositories</h6>

			<Container className={'favoriteRepos'}>
				<Stack gap={3}>
					<Row>
						<Col>
							<h6 className={'repoItem'}>Repo 1</h6>
						</Col>
					</Row>
					<Row >
						<Col>
							<h6 className={'repoItem'}>Repo 2</h6>
						</Col>
					</Row>
					<Row>
						<Col>
							<h6 className={'repoItem'}>Repo 3</h6>
						</Col>
					</Row>
				</Stack>
			</Container>
		</div>


	);
};
export default MainSideBarElement;
