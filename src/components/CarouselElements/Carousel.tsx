import {Card, Col, Row, Carousel, Stack} from 'react-bootstrap';
import React, {useContext, useState} from 'react';
import RepoCard from './RepoCard';
import './cssStyles/CarouselStyles.css';
import {SkillsData} from '../SearchBarElements/testjson';
import {SearchBarContext} from '../MyContext';
import {getRatelimit, getRepositoriesByName} from '../../backend/api/github-queries/queries';
const ResultCarousel = () => {
	const searchContext = useContext(SearchBarContext);
	const [index, setIndex] = useState(0);
	const skillsData = SkillsData;
	const handleSelect = async (selectedIndex:number) => {
		setIndex(selectedIndex);
	};
	return (
		<>
			<Carousel className={'mainCarouselComponent'} interval={null} data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
				{skillsData.map((item) => {
					return(
						// eslint-disable-next-line react/jsx-key
						<Carousel.Item>
							<Stack className={'stackComponent'} direction={'horizontal'} gap={1}>
								{item.list.map((skill) => {
									return(
										<>
										
											<RepoCard img={skill.img} name={skill.name}/>
												
											
										</>
									);
								})}
							</Stack>
						</Carousel.Item>
						
					);
				})}
			</Carousel>
		</>
	);
};
export default ResultCarousel;