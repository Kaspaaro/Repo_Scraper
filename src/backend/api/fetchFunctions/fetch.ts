import {Application} from 'express';
import fetchData from '../../auth-functions/fetchData';
import {UserTest} from '../../database/types/DBTypes';
import randomstring from 'randomstring';

const doGraphQLFetch = async (
	url: string,
	query: string,
	variables: object,
) => {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};
	console.log('VARIABLES', variables);
	console.log('QUERY', query);
	const response = await fetchData(url, {
		method: 'POST',
		headers,

		body: JSON.stringify({
			query,
			variables,
		}),
	});
	return response;
};

export { doGraphQLFetch };