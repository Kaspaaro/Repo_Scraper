import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as SideBarButton} from '../svgElements/ButtonHalfCircle.svg';
import '../Styles/SideBar.css';
import {Button, Col, Container, Row, Stack} from 'react-bootstrap';
import {doGraphQLFetch} from '../../../backend/api/GraphQL-queries/doGraphQLFetch';
import {addRepository, deleteRepository, updateFavoriteRepos} from '../../../backend/api/GraphQL-queries/queries';
import {AddToFavoritesContext, LoginButtonContext, LoginTokenContext, NodeItemContext} from '../../MyContext';
import {favoriteResult, RepositoryOutput,Node} from '../../../backend/database/types/DBTypes';
import {JSX} from 'react/jsx-runtime';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const MainSideBarElement = () =>{
	const [isOpen, setIsOpen] = useState(false);
	const {userToken, setUserToken,username, setUsername} = useContext(LoginTokenContext);
	const {click, setClick} = useContext(AddToFavoritesContext);
	const {name_Context,node_id_Context,url_Context,updated_at_Context,setName_Context,setNode_id_Context,setUpdated_at_Context,setUrl_Context} = useContext(NodeItemContext);
	const [favoriteRepos, setFavoriteRepos] = useState<JSX.Element[]>([]);
	const [favItem, setFavItem] = useState<JSX.Element>();
	const loginButtonContext = useContext(LoginButtonContext);
	const [updateclicked, setUpdateClicked] = useState(false);
	loginButtonContext.clickedFunction = async ()=>{
		setUpdateClicked(!updateclicked);
	};
	const updateFavItems = async ()=>{
		try{
			const res = await doGraphQLFetch(process.env.REACT_APP_GRAPHQL_SERVER!,updateFavoriteRepos,{},userToken) as favoriteResult;
			res.favorites.map((item)=>{
				try {
					const newItem = (
						<Row key={item.id}>
							<Col>
								<h6 className={'repoItem'}>{item.name}</h6>
								<Button href={item.url} target={'_blank'}>GO</Button>
								<Button onClick={()=>deleteFavorite(item.id)}>DELETE</Button>
							</Col>
						</Row>
					);
					setFavoriteRepos(prevItems => [...prevItems, newItem]);
				} catch (e) {
					console.log('Error SideBar @updateFavItems function @map function');
				}
			});
		}catch (e) {
			console.log('There are no items in the favorite list yet');
		}
	};
	const deleteFavorite = async (id:string)=>{
		const result = {
			id: id,
		};
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await doGraphQLFetch(process.env.REACT_APP_GRAPHQL_SERVER!,deleteRepository,result,userToken);
		setFavoriteRepos(prevItems => prevItems.filter(item => item.key !== id));
	};
	const fetchRepository = async () => {
		const vars = {
			input: {
				node_id: node_id_Context,
				name: name_Context ,
				url: url_Context,
				updated_at: new Date(updated_at_Context),
			},
		};
		const repo = await doGraphQLFetch(process.env.REACT_APP_GRAPHQL_SERVER!,addRepository,vars,userToken) as RepositoryOutput;

		try {
			const newItem = (
				<Row key={repo.addRepository.id}>
					<Col>
						<h6 className={'repoItem'}>{repo.addRepository.name}</h6>
						<Button href={repo.addRepository.url} target={'_blank'}>GO</Button>
						<Button onClick={()=>deleteFavorite(repo.addRepository.id)}>DELETE</Button>
					</Col>
				</Row>
			);
			setFavoriteRepos(prevItems => [...prevItems, newItem]);
		} catch (e) {
			console.log('Error SideBar @fetchRepository function',);
		}
	};
	const handleOpen = () =>{
		setIsOpen(!isOpen);
	};
	useEffect(()=>{
		if (click) {
			fetchRepository();
		}
	},[click]);
	useEffect(() => {
		if (updateclicked){
			updateFavItems();
		}
	}, [updateclicked]);


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
