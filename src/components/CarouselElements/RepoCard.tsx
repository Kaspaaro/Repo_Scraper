import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Owner} from '../../backend/database/types/DBTypes';
const RepoCard = ({name,owner,url,clickReadmeURL} : {name: string,owner:Owner,url:string,clickReadmeURL:(url: string)=>void}) => {

	return(
		<Card className={'card clickable'} onClick={() => {clickReadmeURL(`https://api.github.com/repos/${owner.login}/${name}`);}} >
			<Card.Body className={'card-body'}>
				<p className={'name mb-0'}>{name}</p>
				<p className={'mb-0'}>{owner.login}</p>
				<Button href={url} className={'btn-sm'}>Visit Repository on github</Button>
			</Card.Body>
		</Card>
	);
};
export default RepoCard;