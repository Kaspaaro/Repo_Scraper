const doGraphQLFetch = async (
	url: string,
	query: string,
	variables:object,
	token?: string,
) => {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	console.log('ALL GRAPHQL FETCH', url, query,token);
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query,
				variables,
			}),
		});
		if (!response.ok) throw new Error(response.statusText);
		const json = await response.json();
		console.log('RESPONSER', response);
		return json.data;
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export { doGraphQLFetch };