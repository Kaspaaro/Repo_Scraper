import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Owner} from '../../backend/database/types/DBTypes';
const RepoCard = ({name,owner,url,clickReadmeURL} : {name: string,owner:Owner,url:string,clickReadmeURL:(url: string)=>void}) => {

	return(
		<Card className={'skill-card clickable'} onClick={() => {clickReadmeURL(`https://api.github.com/repos/${owner.login}/${name}`);}} >
			<Card.Body className={'card-body'}>
				<div className={'skill-img'}></div>
				<h2 className={'skill-name'}>{name}</h2>
				<h1>{owner.login}</h1>
				<Button href={url}>Visit Repository on github</Button>
			</Card.Body>
		</Card>
	);
};
export default RepoCard;