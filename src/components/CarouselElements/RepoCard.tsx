import React from 'react';
import {Card} from 'react-bootstrap';
const RepoCard = ({name, img} : {name: string, img: JSX.Element}) => {
	return(
		<Card className={'skill-card'}>
			<Card.Body className={'card-body'}>
				<div className={'skill-img'}>{img}</div>
				<label className={'skill-name'}>{name}</label>
			</Card.Body>
		</Card>
	);
};
export default RepoCard;