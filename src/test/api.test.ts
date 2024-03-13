/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import {LoginResponse} from '../backend/database/types/MessageTypes';
import {UserTest, RepositoryTest} from '../backend/database/types/DBTypes';
import randomstring from 'randomstring';
import app from '../backend/app';
import {adminDeleteUser, deleteUser, loginUser, postUser} from './userTestFuntions';
import {
	addRepository,
	addRepositoryFails,
	deleteRepository,
	fetchAllRepositories,
	updateRepositories
} from './repositoryTestFunctions';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;
import {GraphQLError} from "graphql";
describe('Test GraphQL API', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL as string);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	let userData: LoginResponse;
	let userData2: LoginResponse;
	let testRepo: RepositoryTest;
	let adminData: LoginResponse;

	const testUser: UserTest = {
		user_name: 'Test User ' + randomstring.generate(7),
		email: randomstring.generate(9) + '@user.fi',
		password: 'testpassword',
	};

	const testUser1: UserTest = {
		user_name: 'Test User ' + randomstring.generate(7),
		email: randomstring.generate(9) + '@user.fi',
		password: 'testpassword',
	};

	it('should create a new user', async () => {
		await postUser(app, testUser);
	});

	it('should create second user', async () => {
		await postUser(app, testUser1);
	});

	it('should login user', async () => {
		const vars = {
			credentials: {
				username: testUser.email!,
				password: testUser.password!,
			},
		};
		userData = await loginUser(app, vars);
	});

	it('should login second user', async () => {
		const vars = {
			credentials: {
				username: testUser1.email!,
				password: testUser1.password!,
			},
		};
		userData2 = await loginUser(app, vars);
	});

	const adminUser: UserTest = {
		email: process.env.SECRET_USERNAME as string,
		password: process.env.SECRET_PASSWORD as string,
	};

	it('should login admin', async () => {
		const vars = {
			credentials: {
				username: adminUser.email!,
				password: adminUser.password!,
			},
		};
		adminData = await loginUser(app, vars);
	});

	it('should add a new repository', async () => {
		const vars = {
			input: {
				node_id: 'R_kgDOLbfZfQ',
				name: 'Test Repository' + randomstring.generate(7),
				url: 'testRepo-' + randomstring.generate(7)+ '.com',
				updated_at: new Date('2020-03-04T15:11:41.000+00:00'),
			},
		};
		testRepo =  await addRepository(app, userData.token!, vars);
	});

	it('should update repositories', async () => {
		await updateRepositories(app, userData.token!);
	});

	const addRepos = async () => {
		for (let i = 0; i < 9; i++) {
			const vars = {
				input: {
					node_id: 'R_' + randomstring.generate(10),
					name: 'Test Repository' + randomstring.generate(7),
					url: 'testRepo-' + randomstring.generate(7) + '.com',
					updated_at: new Date('2020-03-04'),
				},
			};
			await addRepository(app, userData.token!, vars);
		}
	};


	it('should not add more than 10 repos per user', async () => {
		await addRepos();
		const vars = {
			input: {
				node_id: 'R_' + randomstring.generate(10),
				name: 'Test Repository' + randomstring.generate(7),
				url: 'testRepo-' + randomstring.generate(7) + '.com',
				updated_at: new Date('2020-03-04'),
			},
		};
		await addRepositoryFails(app, userData.token!, vars);
	});

	it('should get all repositories from favorites', async () => {
		await fetchAllRepositories(app, userData.token!);
	});

	it('should delete a repository from favorites', async () => {
		await deleteRepository(app, userData.token!, testRepo.id!);
	});

	it('should delete a user as admin', async () => {
		await adminDeleteUser( app,
			userData2.user.id,
			adminData.token!,);
	});

	it('should delete current user', async () => {
		await deleteUser(app, userData.token!);
	});
});
