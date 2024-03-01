import request from 'supertest';
import { Application } from 'express';
import {UserTest} from '../backend/database/types/DBTypes';
import {LoginResponse, UserResponse} from '../backend/database/types/MessageTypes';
const postUser = (
	url: string | Application,
	user: UserTest,
): Promise<UserTest> => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.send({
				query: `mutation Mutation($user: UserInput!) {
                          register(user: $user) {
                            message
                            user {
                              id
                              user_name
                              email
                            }
                          }
                        }`,
				variables: {
					user: {
						user_name: user.user_name,
						email: user.email,
						password: user.password,
					},
				},
			})
			.expect(200, (err, response) => {
				if (err) {
					reject(err);
				} else {
					const userData = response.body.data.register;
					expect(userData).toHaveProperty('message');
					expect(userData).toHaveProperty('user');
					expect(userData.user).toHaveProperty('id');
					expect(userData.user.user_name).toBe(user.user_name);
					expect(userData.user.email).toBe(user.email);
					resolve(response.body.data.register);
				}
			});
	});
};

const loginUser = (
	url: string | Application,
	vars: {credentials: {username: string; password: string}},
): Promise<LoginResponse> => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Content-type', 'application/json')
			.send({
				query: `mutation Login($credentials: Credentials!) {
					  login(credentials: $credentials) {
						token
						message
						user {
						  email
						  user_name
						  id
						}
					  }
					}`,
				variables: vars,
			})
			.expect(200, (err, response) => {
				if (err) {
					reject(err);
				} else {
					const user = vars.credentials;
					console.log('login response', response.body);
					const userData = response.body.data.login;
					expect(userData).toHaveProperty('message');
					expect(userData).toHaveProperty('token');
					expect(userData).toHaveProperty('user');
					expect(userData.user).toHaveProperty('id');
					expect(userData.user.email).toBe(user.username);
					resolve(response.body.data.login);
				}
			});
	});
};

const deleteUser = (
	url: string | Application,
	token: string,
): Promise<UserResponse> => {
	return new Promise((resolve, reject) => {
		request(url)
			.post('/graphql')
			.set('Authorization', 'Bearer ' + token)
			.send({
				query: `mutation DeleteUser {
				  deleteUser {
					message
					user {
					  id
					  user_name
					  email
					}
				  }
				}`,
			})
			.expect(200, (err, response) => {
				if (err) {
					reject(err);
				} else {
					const userData = response.body.data.deleteUser;
					expect(userData).toHaveProperty('message');
					expect(userData).toHaveProperty('user');
					resolve(userData);
				}
			});
	});
};

export {postUser, loginUser, deleteUser};
