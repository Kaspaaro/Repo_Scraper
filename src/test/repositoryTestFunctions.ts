import {Application} from 'express';
import request from 'supertest';
import {RepositoryTest} from '../backend/database/types/DBTypes';
import {GraphQLError} from "graphql";
const addRepository = (
	url: string | Application,
	token: string,
	vars: {input: {name: string; url: string, node_id: string, updated_at: Date}},
): Promise<RepositoryTest> => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `mutation Mutation($input: RepositoryInput!) {
                          addRepository(input: $input) {
                          	id
                            name
                            url
                            updated_at
                            node_id
                          }
                        }`,
				variables: vars,
			})
			.expect(200, (err, response) => {
				if (err) {
					reject(err);
				} else {
					const newRepo = response.body.data.addRepository;
					expect(newRepo).toHaveProperty('id');
					expect(newRepo.node_id).toBe(vars.input.node_id);
					expect(newRepo.name).toBe(vars.input.name);
					expect(newRepo.url).toBe(vars.input.url);
					expect(newRepo.updated_at).not.toBe(null);
					resolve(response.body.data.addRepository);
				}
			});
	});
};

const deleteRepository = (url: string | Application, token: string, id: string) => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `mutation Mutation($id: ID!) {
                          removeRepository(id: $id) {
                            id
                          }
                        }`,
				variables: {
					id: id},
			})
			.expect(200, (err, response) => {
				if (err) {
					console.log('error', response.body);
					reject(err);
				} else {
					expect(response.body.data.removeRepository.id).toBe(id);
					resolve(response.body.data.removeRepository.id);
				}
			});
	});
};

const fetchAllRepositories = (url: string | Application, token: string) => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `query Query {
                          favorites {
                          	id
                            name
                            url
                            updated_at
                            node_id
                          }
                        }`,
			})
			.expect(200, (err, response) => {
				if (err) {
					console.log('error', response.body);
					reject(err);
				} else {
					expect(response.body.data.favorites).toBeInstanceOf(Array);
					resolve(response.body.data.favorites);
				}
			});
	});
};
const updateRepositories = (url: string | Application, token: string) => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `mutation Mutation {
						 updateRepositories{
						 	id
                            name
                            url
                            updated_at
                            node_id
                            }
						}`,
			})
			.expect(200, (err, response) => {
				if (err) {
					console.log('error', response.body);
					reject(err);
				} else {
					const updatedRepos = response.body.data.updateRepositories;
					console.log('updatedRepos', updatedRepos);
					expect(response.body.data.updateRepositories).toBeInstanceOf(Array);
					resolve(response.body.data.updateRepositories);
				}
			});
	});
};

const addRepositoryFails = (
	url: string | Application,
	token: string,
	vars: {input: {name: string; url: string, node_id: string, updated_at: Date}},
): Promise<GraphQLError> => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				query: `mutation Mutation($input: RepositoryInput!) {
                          addRepository(input: $input) {
                          	id
                            name
                            url
                            updated_at
                            node_id
                          }
                        }`,
				variables: vars,
			})
			.expect(200, (err, response) => {
				console.log('response', response.body);
				if (err) {
					reject(err);
				} else {
					expect(response.body.errors[0].message).toBe('You can only add 10 repositories to your favorites');
					resolve(response.body.data.addRepository);
				}
			});
	});
};

export {addRepository, addRepositoryFails, deleteRepository, fetchAllRepositories, updateRepositories};
