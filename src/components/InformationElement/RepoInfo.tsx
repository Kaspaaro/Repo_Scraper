import React, {useEffect, useState} from 'react';
import './Styles/RepoinfoStyles.css';
import MarkdownElement from '../SearchBarElements/MarkdownElement_README';
import {Col, Container, Row, Stack} from 'react-bootstrap';
import {fetchLanguages} from '../../backend/api/github-queries/queries';

const repoInfo = ({url,description,readmeClicked}:{url:string,description:string|undefined,readmeClicked:boolean}) =>{
	const [lang, setLang] = useState<{ name: string, value: number }[] | ''>([]);
	
	useEffect(() => {
		if (readmeClicked){
			const fetchLanguagesFunction = async () => {
				try {
					const fileContent = await fetchLanguages(url);
					setLang(fileContent);
				} catch (error) {
					console.error('Error fetching file content:', error);
				}
			};

			fetchLanguagesFunction();
		}
	}, [readmeClicked,url]);
	
	const fetchLanguagesInfo = () => {
		const convert = lang as { name: string, value: number }[];
		const sum = convert.reduce((total, item) => total + item.value, 0);
		return convert.map((item, i) => {
			const percentage = (item.value / sum) * 100;
			const result = percentage.toFixed(1);
			const valueList = [];
			valueList.push(item.value);
			return (
				<Row key={i} style={{height:'2rem'}}>
					<Col xs={50}>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<div className={'fs-6'} style={{height: '1rem', backgroundColor: 'black', width: `${result}%`,marginRight:'8%'}}>
								<p style={{color:'white',fontSize:'10px',marginLeft:'0.4rem'}}>{result}%</p>
							</div>
							<p className={'fs-6 mb-0'} style={{marginLeft:'6%'}}>{item.name}</p>
						</div>
					</Col>
				</Row>
			);
		}
		);
	};

	return (
		<>
			{readmeClicked && (
				<Container className={'repoInfoContainer w-60'}>
					<Row>
						<Col lg={9} >
							<div className={'title-README'}>
								<h3>README</h3>
							</div>
						</Col>
						<Col className={'row-cols-2 overflow-hidden mb-3'} lg={9}>
							<div className={'repoInfo'}>
								<MarkdownElement url={url} clicked={readmeClicked}/>
							</div>

						</Col>
						<Col className={'overflow-hidden mb-3'} style={{height:'31rem'}}>
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
									<div className={'langBox'}>
										<Stack className={'overflow-scroll'} style={{height:'9rem'}} >
											{fetchLanguagesInfo()}
										</Stack>
									</div>
								</Col>
							</Row>

						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};
export default repoInfo;