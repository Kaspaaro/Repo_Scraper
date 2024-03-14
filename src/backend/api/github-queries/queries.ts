import {Octokit} from 'octokit';
import {
	GithubOutputRepositories,
	GithubRepository, GithubRepoType, RepoLanguages, Repot,
	SearchRepositoriesOutput,
	UserRepositories
} from '../../database/types/DBTypes';
import CustomError from '../../CustomError';
import {GraphQLError} from 'graphql';
const octokit = new Octokit({
	auth: process.env.REACT_APP_API_TOKEN,
	userAgent: 'octokit/rest.js v1.2.3',
});

const getRateLimit = async () => {
	const data = await octokit.request('GET /rate_limit', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});
	return data.data.rate.remaining;
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
		console.log('Rate limit left: ', getRateLimit());
		return repos;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories', 500));
		return [];
	}
};

const fetchReadme = async (url: string) => {
	try {
		const query = await octokit.request(`GET ${url}/contents/README.md`, {
			path: 'README.md',
			headers: {
				'Accept': 'application/vnd.github.v3.raw'
			}
		});
		console.log('Rate limit left: ', getRateLimit());
		return query.data;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching readme', 500));
		return '';
	}
};
const fetchLanguages = async (url: string) => {
	try {
		const query = await octokit.request(`GET ${url}/languages`);
		const res : { name: string, value: number }[] = Object.entries(query.data).map(([name, value]) => ({ name, value: Number(value)}));
		return res;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching Languages', 500));
		return '';
	}
};

const getRepositoriesByUsername = async (username: string) => {
	try {
		const query = `query {
				user(login: "${username}") {
					name
					repositories(first: 100) {
						nodes {
							id
							name
							url
							description
							languages(first: 5) {
								nodes {
									name
								}
							}
							collaborators {
								nodes {
									login
								}
							}
							owner {
								login
							}
						}
					}
				}
			}`;
		const repos:UserRepositories = await octokit.graphql(query);
		console.log('Rate limit left: ', getRateLimit());
		return repos.user.repositories.nodes;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by username', 500));
		return [];
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
				languages(first: 5) {
					nodes {
						name
					}
				}
				owner {
					login
				}
			}
		}
	}`;
		const repos:GithubRepository = await octokit.graphql(query);
		console.log('Rate limit left: ', getRateLimit());
		return repos.nodes;
	}catch (error) {
		console.log(error);
		console.log(new CustomError('An error occurred while fetching repositories by ids', 500));
		return [];
	}
};

const getRepositoriesByName = async (name: string) => {
	try {
		const query = `query {
		  search(query: "${name} in:name", type: REPOSITORY, first: 100) {
			edges {
			  node {
				... on Repository {
				  owner {
				  	login
				  }	
				  name
				  url
				  description
				  updatedAt
				  id
				}
			  }
			}
		  }
		}`;
		const repos:SearchRepositoriesOutput = await octokit.graphql(query);
		console.log('Rate limit left: ',getRateLimit());
		return repos.search.edges;
	}
	catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by name', 500));
		return [];
	}
};



export {getRepositoriesByUsername, getRepositories, getRepositoriesByIds, getRepositoriesByName, fetchReadme, getRateLimit,fetchLanguages};
