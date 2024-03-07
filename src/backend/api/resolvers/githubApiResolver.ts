import {GithubRepository, GithubUser, OutputRepository} from '../../database/types/DBTypes';
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
			console.log('res', res.data.user.name);
			return res.data.user;
		},
		githubRepos: async (parent: undefined, args:{listID: string[]}) => {
			console.log('args', args.listID);
			const response = await fetchData<GithubRepository>('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query: `query {
					nodes(ids: ["${args.listID.join('","')}"]) {
						... on Repository {
						id
						name
						url
						description
						owner {
							login
						  }
						}
					  }
					}`
				}),
			});
			console.log('response', response.data.nodes.map((node) => node.owner.login));
			return response.data.nodes;
		}
	}
};

