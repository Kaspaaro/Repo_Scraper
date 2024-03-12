import {fetchReadme} from '../backend/api/github-queries/queries';
import React, {useEffect, useState} from 'react';
import Markdown from 'react-markdown';


const MarkdownTestFunc:React.FC = () => {
	const [markdownContent, setMarkdownContent] = useState<string>('');
	useEffect(() => {
		const fetchReadMe = async () => {
			try {
				const fileContent = await fetchReadme('https://api.github.com/repos/FullStack-HY/FullStack-HY.github.io/contents/README.md');
				setMarkdownContent(fileContent);
			} catch (error) {
				console.error('Error fetching file content:', error);
			}
		};

		fetchReadMe();
	}, []);

	return(
		<div>
			<Markdown>
				{markdownContent}
			</Markdown>
		</div>);
};
export default MarkdownTestFunc;
