import {GithubUser} from '../../database/types/DBTypes';
import fetchData from '../../auth-functions/fetchData';

export default {
	Query: {
		githubUser: async (parent: undefined, args: { username: string }) => {
			console.log('args', args.username);
			const res = await fetchData<GithubUser>('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query: `query {
                    user(login: "${args.username}") {
                    name
                    }
                }`
				}),
			});
			return res.data.user;
		}
	}
};