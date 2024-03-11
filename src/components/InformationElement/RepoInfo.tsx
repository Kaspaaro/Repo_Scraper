import React from 'react';
import './Styles/RepoinfoStyles.css';
import MarkdownTestFunc from '../../frontend/MarkdownTestPage';
import {Col, Container, Row, Stack} from 'react-bootstrap';
const repoInfo = () =>{
	return (
		<Container className={'repoInfoContainer w-60'}>
			<Row>
				<Col lg={9} >
					<div className={'title-README'}>
						<h3>README</h3>
					</div>
				</Col>
				<Col className={'row-cols-2 overflow-hidden'} lg={9}>
					<div className={'repoInfo'}>
						<MarkdownTestFunc/>
					</div>

				</Col>
				<Col className={'overflow-hidden'}>
					<Row className={'repoAbout h-100'} lg={1}>
						<Col>
							<div className={'title-README'}>
								<h4 className={'p-2 mt-2'}>About</h4>
							</div>
							<div className={'descBox h-50'}>
								<p className={'fs-6'}>Description</p>
							</div>
						</Col>
						<Col>
							<div className={'title-README'}>
								<h4 className={'p-2 mt-2'}>Collaborators</h4>
							</div>
							<div className={'descBox h-50'}>
								<p className={'fs-6'}>collabs</p>
							</div>
						</Col>
						<Col>
							<div className={'title-README'}>
								<h4 className={'p-2 mt-2'}>Languages</h4>
							</div>
							<div className={'descBox h-50'}>
								<p className={'fs-6'}>Languages</p>
							</div>
						</Col>
					</Row>

				</Col>
			</Row>
		</Container>
	);
};
export default repoInfo;