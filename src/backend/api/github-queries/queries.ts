import {Octokit} from 'octokit';
import {
	GithubOutputRepositories,
	GithubRepository, GithubRepoType, Repot,
	SearchRepositoriesOutput,
	UserRepositories
} from '../../database/types/DBTypes';
import CustomError from '../../CustomError';
const octokit = new Octokit({
	auth: process.env.API_TOKEN,
	userAgent: 'octokit/rest.js v1.2.3',
});

const getRatelimit = async () => {
	const data = await octokit.request('GET /rate_limit', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});
	console.log('data', data);
};

const getRepositories =  async (page: number) => {
	try {
		const query = await octokit.request('GET /repositories',
			{
				visibility: 'public',
				per_page: 100,
				sort: 'updated',
				page: page
			},
		);

		const {data} = query;
		const repos: GithubOutputRepositories[] = data.map((repo) => {
			return {
				id: repo.id,
				name: repo.name,
				url: repo.html_url,
				node_id: repo.node_id,
				description: repo.description,
				owner: {
					login: repo.owner.login,
				},
				content_url: repo.contents_url,
			};
		});
		return repos;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories', 500));
		return [];
	}
};

const fetchReadme = async (url: string) => {
	try {
		const query = await octokit.request(`GET ${url}`, {
			path: 'README.md',
			headers: {
				'Accept': 'application/vnd.github.v3.raw'
			}
		});
		return query.data;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching readme', 500));
	}
};

const getRepositoriesByUsername = async (username: string) => {
	try {
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
		return repos.user.repositories.nodes;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by username', 500));
	}
};

const getRepositoriesByIds = async (listID: string[]) => {
	try {
		const query = `query {
		nodes(ids: ["${listID.join('","')}"]) {
			... on Repository {
				id
				name
				url
				description
				updatedAt
				owner {
					login
				}
			}
		}
	}`;
		const repos:GithubRepository = await octokit.graphql(query);
		return repos.nodes;
	}catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by ids', 500));
	}
};

const getRepositoriesByName = async (name: string) => {
	try {
		const query = `query {
		  search(query: "${name} in:name", type: REPOSITORY, first: 100) {
			repositoryCount
			edges {
			  node {
				... on Repository {
				  name
				  url
				  description
				  updatedAt
				}
			  }
			}
		  }
		}`;
		const repos:SearchRepositoriesOutput = await octokit.graphql(query);
		console.log(getRatelimit());
		return repos.search.edges;
	}catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by name', 500));
	}
};

export {getRepositoriesByUsername, getRepositories, getRepositoriesByIds, getRepositoriesByName, fetchReadme};
