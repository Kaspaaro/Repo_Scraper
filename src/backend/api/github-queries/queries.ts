import {Octokit} from 'octokit';
import {
	GithubOutputRepositories,
	GithubRepository, GithubRepoType, RepoLanguages, Repot,
	SearchRepositoriesOutput,
	UserRepositories
} from '../../database/types/DBTypes';
import CustomError from '../../CustomError';

// Create a new instance of the Octokit class.
// Octokit is a client to interact with the GitHub API.
// In default, user can make 60 requests per hour without authentication.
// If you want to make more requests, you need to authenticate with a GitHub token.
const octokit = new Octokit({
	auth: process.env.REACT_APP_API_TOKEN,
	userAgent: 'octokit/rest.js v1.2.3',
});

/*
* This function fetches the rate limit of the GitHub API.
* @returns The number of requests left.
* @throws CustomError if an error occurred while fetching the rate limit.
 */
const getRateLimit = async () => {
	const data = await octokit.request('GET /rate_limit', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});
	return data.data.rate.remaining;
};

/*
* This function fetches the repositories from the GitHub REST API endpoint.
* @param page The page number of the repositories.
* @returns The first 100 repositories of the page.
* @throws CustomError if an error occurred while fetching the repositories.
 */
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

/*
* This function fetches the readme of a repository from the GitHub REST API endpoint.
* @param url The url of the repository.
* @returns The readme of the repository.
* @throws CustomError if an error occurred while fetching the readme.
 */
const fetchReadme = async (url: string) => {
	try {
		const query = await octokit.request(`GET ${url}/contents/README.md`, {
			path: 'README.md',
			headers: {
				'Accept': 'application/vnd.github.v3.raw'
			}
		});
		return query.data;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching readme', 500));
		return '';
	}
};

/*
* This function fetches the languages of a repository from the GitHub REST API endpoint.
* @param url The url of the repository.
* @returns The languages of the repository.
 */
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

/*
* This function fetches the repositories by username from the GitHub API graphql endpoint.
* @param username The username of the user.
* @returns The repositories of the user.
 */
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
		return repos.user.repositories.nodes;
	} catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by username', 500));
		return [];
	}
};

/*
* This function fetches the repositories by ids from the GitHub API graphql endpoint.
* @param listID The list of ids of the repositories.
* @returns The repositories of the ids.
* @throws CustomError if an error occurred while fetching the repositories by ids.
 */
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
		return repos.nodes;
	}catch (error) {
		console.log(error);
		console.log(new CustomError('An error occurred while fetching repositories by ids', 500));
		return [];
	}
};

/*
* This function fetches the repositories by name from the GitHub API graphql endpoint.
* @param name The name of the repository.
* @returns The repositories of the name.
* @throws CustomError if an error occurred while fetching the repositories by name.
 */
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
		return repos.search.edges;
	}
	catch (error) {
		console.log(new CustomError('An error occurred while fetching repositories by name', 500));
		return [];
	}
};

export {getRepositoriesByUsername, getRepositories, getRepositoriesByIds, getRepositoriesByName, fetchReadme, getRateLimit,fetchLanguages};
