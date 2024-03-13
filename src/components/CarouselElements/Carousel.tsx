import {Card, Col, Row, Carousel, Stack, Button} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import RepoCard from './RepoCard';
import './cssStyles/CarouselStyles.css';
import {Languages, Node, Owner} from '../../backend/database/types/DBTypes';
import {SearchBarContext} from '../MyContext';
import { JSX } from 'react/jsx-runtime';
import {forEach} from 'react-bootstrap/ElementChildren';
import RepoInfo from '../InformationElement/RepoInfo';


const ResultCarousel = (
	{handleClick, handleSendUrl,getDescription}:
		{
			handleClick: ()=>void,
			handleSendUrl:(url: string)=>void,
			getDescription: (desc: string | undefined) => void
		}
) => {
	const searchContext = useContext(SearchBarContext);
	const [index, setIndex] = useState(0);
	const [clicked, setClicked] = useState(false);
	const [carouselItems, setCarouselItems] = useState<JSX.Element[]>([]);
	const skillsData = searchContext.result as Node[];
	const handleSelect = async (selectedIndex: number) => {
		setIndex(selectedIndex);
	};

	const fetchStack = (items: Node[]) => {
		fetchInformation(items);
		return items.map((item, i) => (
			<RepoCard key={i} name={item.name} owner={item.owner} url={item.url} clickReadmeURL={handleSendUrl}/>
		));
	};
	const fetchInformation = (items: Node[]) => {
		return items.map((item, i) => {
			if (item.description) {
				getDescription(item.description);
			}
		});
	};

	useEffect(() => {
		const items: JSX.Element[] = [];
		try {
			while (skillsData.length > 0) {
				const batch = skillsData.splice(0, 5);
				items.push(
					<Carousel.Item key={items.length}>
						<Stack className={'stackComponent'} direction={'horizontal'} gap={1}>
							{fetchStack(batch)}
						</Stack>
					</Carousel.Item>
				);
			}
			setCarouselItems(items);

		} catch (e) {
			console.log('error', e);
		}
	}, [clicked]);
	return (
		<>
			<Button className={'mt-0'} onClick={async ()=>{await handleClick(); setClicked(!clicked);}}>Search</Button>
			<Carousel className={'mainCarouselComponent'} interval={null} data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
				{carouselItems}
			</Carousel>

		</>
	);
};
export default ResultCarousel;