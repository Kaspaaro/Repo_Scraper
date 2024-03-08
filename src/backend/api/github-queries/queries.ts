import {Octokit} from 'octokit';
import {GithubRepository, Repositories, UserRepositories} from '../../database/types/DBTypes';
import app from '../../app';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: 'octokit/rest.js v1.2.3',
});

const getRepositories =  async (page: number) => {
	const query = await octokit.request('GET /repositories',
		{
			visibility: 'public',
			per_page: 100,
			sort: 'updated',
			page: page
		},
	);
	const maps = query.data.map(repo => { return repo.contents_url;});
	const query2 = await octokit.request(`GET ${maps[0]}`, {
		path: 'README.md',
		headers: {
			'Accept': 'application/vnd.github.v3.raw'
		}
	});
	const file = query2.data;
	console.log('file', file);
	//console.log('query2', query2.data.download_url);
	return file;
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

const getRepositoriesByIds = async (listID: string[]) => {
	const query = `query {
		nodes(ids: ["${listID.join('","')}"]) {
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
	}`;
	const repos:GithubRepository = await octokit.graphql(query);
	console.log('repos', repos.data.nodes);
};

export {getRepositoriesByUsername, getRepositories, getRepositoriesByIds};
