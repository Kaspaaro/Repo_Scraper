import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as SideBarButton} from '../svgElements/ButtonHalfCircle.svg';
import '../Styles/SideBar.css';
import {Button, Col, Container, Row, Stack} from 'react-bootstrap';
import {doGraphQLFetch} from '../../../backend/api/GraphQL-queries/doGraphQLFetch';
import {addRepository, deleteRepository} from '../../../backend/api/GraphQL-queries/queries';
import randomstring from 'randomstring';
import {AddToFavoritesContext, LoginTokenContext, NodeItemContext} from '../../MyContext';
import {RepositoryOutput} from '../../../backend/database/types/DBTypes';
import {JSX} from 'react/jsx-runtime';
const MainSideBarElement = () =>{
	const [isOpen, setIsOpen] = useState(false);
	const {userToken, setUserToken,username, setUsername} = useContext(LoginTokenContext);
	const {click, setClick} = useContext(AddToFavoritesContext);
	const {owner_Context,name_Context,node_id_Context,url_Context,updated_at_Context, setOwner_Context,setName_Context,setNode_id_Context,setUpdated_at_Context,setUrl_Context} = useContext(NodeItemContext);
	const [favoriteRepos, setFavoriteRepos] = useState<JSX.Element[]>([]);
	const [favItem, setFavItem] = useState<JSX.Element>();
	const vars = {
		input: {
			node_id: node_id_Context,
			name: name_Context ,
			url: url_Context,
			updated_at: new Date(updated_at_Context),
		},
	};
	const deleteFavorite = async (id:string)=>{
		const result = {
			id: id,
		};
		await doGraphQLFetch(process.env.REACT_APP_GRAPHQL_SERVER!,deleteRepository,result,userToken);
		setFavoriteRepos(prevItems => prevItems.filter(item => item.key !== id));
	};
	const fetchRepository = async () => {
		const repo = await doGraphQLFetch(process.env.REACT_APP_GRAPHQL_SERVER!,addRepository,vars,userToken) as RepositoryOutput;
		try {
			const newItem = (
				<Row key={repo.addRepository.id}>
					<Col>
						<h6 className={'repoItem'}>{repo.addRepository.name}</h6>
						<Button href={repo.addRepository.url}>GO</Button>
						<Button onClick={()=>deleteFavorite(repo.addRepository.id)}>DELETE</Button>
					</Col>
				</Row>
			);
			setFavoriteRepos(prevItems => [...prevItems, newItem]);
		} catch (e) {
			console.log('error', e);
		}
	};
	const handleOpen = () =>{
		console.log('clicked');
		setIsOpen(!isOpen);
	};
	useEffect(()=>{
		if (click) {
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
				<Stack gap={3} className={'overflow-auto'} style={{height:'30rem'}}>
					{favoriteRepos}
				</Stack>
			</Container>
		</div>
			
		
	);
};
export default MainSideBarElement;