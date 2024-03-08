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
			per_page: 5,
			sort: 'updated',
			page: 1
		},
	);
	const maps = query.data.map(repo => { return repo.contents_url;});
	console.log('urls', maps[0]);
	const query2 = await octokit.request(`GET ${maps[0]}`, {
		path: 'README.md'
	});
	console.log('query2', query2.data.download_url);
};

const getRepositoriesByUsername = async (username: string) => {
	const query = `query {
        user(login: "${username}") {
            name
            repositories(first: 10) {
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
