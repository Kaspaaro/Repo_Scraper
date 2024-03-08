import {Application} from 'express';
import request from 'supertest';
import {RepositoryTest} from '../backend/database/types/DBTypes';
const addRepository = (
	url: string | Application,
	token: string,
	vars: {input: {name: string; url: string}},
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
					console.log('error', response.body);
					reject(err);
				} else {
					const newRepo = response.body.data.addRepository;
					expect(newRepo).toHaveProperty('id');
					expect(newRepo.name).toBe(vars.input.name);
					expect(newRepo.url).toBe(vars.input.url);
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


export {addRepository, deleteRepository, fetchAllRepositories};
