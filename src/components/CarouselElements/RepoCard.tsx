import React, {useContext} from 'react';
import {Button, Card} from 'react-bootstrap';
import {Node, Owner} from '../../backend/database/types/DBTypes';
import {AddToFavoritesContext, NodeItemContext} from '../MyContext';
const RepoCard = ({name,owner,url,clickReadmeURL,updateDescription,nodeItems,nodeID} : {name: string,owner:Owner,url:string,clickReadmeURL:(url: string)=>void,updateDescription:(item: Node)=>void,nodeItems: Node,nodeID:string}) => {
	const {click, setClick} = useContext(AddToFavoritesContext);
	const {name_Context,node_id_Context,url_Context,updated_at_Context,setName_Context,setNode_id_Context,setUpdated_at_Context,setUrl_Context} = useContext(NodeItemContext);
	const handleInformation = () =>{
		setName_Context(name);
		setNode_id_Context(nodeID);
		setUrl_Context(url);
		setUpdated_at_Context(nodeItems.updatedAt.toString());
	};
	return(
		<Card className={'card clickable'} onClick={() => {clickReadmeURL(`https://api.github.com/repos/${owner.login}/${name}`); updateDescription(nodeItems);}} >
			<Card.Body className={'card-body'}>
				<Button onClick={()=>{setClick(true); handleInformation();}}>Add to favorites</Button>
				<p className={'name mb-0'}>{name}</p>
				<p className={'mb-0'}>{owner.login}</p>
				<Button href={url} target={'_blank'} className={'btn-sm'}>Visit Repository on github</Button>
			</Card.Body>
		</Card>
	);
};
export default RepoCard;