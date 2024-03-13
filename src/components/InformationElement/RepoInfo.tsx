import React, {useEffect, useState} from 'react';
import './Styles/RepoinfoStyles.css';
import MarkdownElement from '../SearchBarElements/MarkdownTestPage';
import {Col, Container, Row} from 'react-bootstrap';
import {fetchLanguages} from '../../backend/api/github-queries/queries';

const repoInfo = ({url,description,languages}:{url:string,description:string|undefined,languages:NonNullable<unknown>}) =>{
	const [lang, setLang] = useState<{ name: string, value: number }[] | ''>([]);
	
	useEffect(() => {
		const fetchReadMeFunction = async () => {
			try {
				const fileContent = await fetchLanguages(url);
				setLang(fileContent);
			} catch (error) {
				console.error('Error fetching file content:', error);
			}
		};

		fetchReadMeFunction();
	}, [url]);
	
	const fetchLanguagesInfo = () => {
		const convert = lang as { name: string, value: number }[];
		return convert.map((item, i) => {
			return (
				<p key={i} className={'fs-6'}>{item.name}</p>
			);
		});
	};

	return (
		<Container className={'repoInfoContainer w-60'}>
			<Row>
				<Col lg={9} >
					<div className={'title-README'}>
						<h3>README</h3>
					</div>
				</Col>
				<Col className={'row-cols-2 overflow-hidden mb-3'} lg={9}>
					<div className={'repoInfo'}>
						<MarkdownElement url={url}/>
					</div>

				</Col>
				<Col className={'overflow-hidden mb-3'}>
					<Row className={'repoAbout h-100'} lg={1}>
						<Col>
							<div className={'title-ABOUT'}>
								<h4 className={'p-2 mt-2'}>About</h4>
							</div>
							<div className={'descBox h-50'}>
								<p className={'fs-6'}>{description}</p>
							</div>
						</Col>
						<Col>
							<div className={'title-LANGUAGES'}>
								<h4 className={'p-2 mt-2'}>Languages</h4>
							</div>
							<div className={'descBox h-50'}>
								{fetchLanguagesInfo()}
							</div>
						</Col>
					</Row>

				</Col>
			</Row>
		</Container>
	);
};
export default repoInfo;