import {fetchReadme} from '../../backend/api/github-queries/queries';
import React, {useEffect, useState} from 'react';
import Markdown from 'react-markdown';


const MarkdownElement = ({url}:{url:string}) => {
	const [markdownContent, setMarkdownContent] = useState<string>('');
	useEffect(() => {
		const fetchReadMeFunction = async () => {
			try {
				const fileContent = await fetchReadme(url);
				setMarkdownContent(fileContent);
			} catch (error) {
				console.error('Error fetching file content:', error);
			}
		};
		fetchReadMeFunction();
	}, [url]);

	return(
		<div>
			<Markdown>
				{markdownContent}
			</Markdown>
		</div>);
};
export default MarkdownElement;
