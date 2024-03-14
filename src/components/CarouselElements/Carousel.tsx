import {Carousel, Stack, Button} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import RepoCard from './RepoCard';
import './cssStyles/CarouselStyles.css';
import { Node} from '../../backend/database/types/DBTypes';
import {SearchBarContext} from '../MyContext';
import { JSX } from 'react/jsx-runtime';


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
		return items.map((item, i) => (
			<RepoCard key={i} name={item.name} owner={item.owner} url={item.url} clickReadmeURL={handleSendUrl} updateDescription={fetchInformation} nodeItems={item} nodeID={item.id}/>
		));
	};
	const fetchInformation = (item: Node) => {
		if (item.description === '' || item.description === undefined || item.description === null) {
			return getDescription('No description Provided');
		}else{
			return getDescription(item.description);
		}
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
			<Button className={'searchButton'} onClick={async ()=>{await handleClick(); setClicked(!clicked);}}>Search</Button>
			<Carousel className={'mainCarouselComponent'} interval={null} data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
				{carouselItems}
			</Carousel>

		</>
	);
};
export default ResultCarousel;