import {Octokit} from 'octokit';
import {Repositories, UserRepositories} from '../../database/types/DBTypes';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: 'octokit/rest.js v1.2.3',
});

const getRepositories =  async () => {
	const query = await octokit.request('GET /repositories',
		{
			visibility: 'public',
			per_page: 100,
			sort: 'updated',
			page: 1
		},
	);
	console.log('query', query);
};

const getRepositoriesByUsername = async (username: string) => {
	const query = `query {
        user(login: "${username}") {
            name
            repositories(first: 100) {
                nodes {
                    id
                    name
                    url
                    description
                    owner {
                        login
                    }
                }
            }
        }
    }`;
	const repos:UserRepositories = await octokit.graphql(query);
	console.log('repos', repos.user);
};

export {getRepositoriesByUsername, getRepositories};
