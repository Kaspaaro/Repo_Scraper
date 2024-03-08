/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import {LoginResponse} from '../backend/database/types/MessageTypes';
import {UserTest, RepositoryTest} from '../backend/database/types/DBTypes';
import randomstring from 'randomstring';
import app from '../backend/app';
import {deleteUser, loginUser, postUser} from './userTestFuntions';
import {addRepository, deleteRepository, fetchAllRepositories} from './repositoryTestFunctions';
describe('Test GraphQL API', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL as string);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	let userData: LoginResponse;
	let testRepo: RepositoryTest;

	const testUser: UserTest = {
		user_name: 'Test User ' + randomstring.generate(7),
		email: randomstring.generate(9) + '@user.fi',
		password: 'testpassword',
	};

	// test for user registration
	it('should create a new user', async () => {
		await postUser(app, testUser);
	});

	//test for user login
	it('should login user', async () => {
		const vars = {
			credentials: {
				username: testUser.email!,
				password: testUser.password!,
			},
		};
		userData = await loginUser(app, vars);
	}, 3000);

	it('should add a new repository to favorites', async () => {
		const vars = {
			input: {
				node_id: 'TEST_ID',
				name: 'Test Repository',
				url: 'testRepo.com',
			},
		};
		testRepo =  await addRepository(app, userData.token!, vars);
		console.log('testRepo', testRepo);
	}, 3000);

	it('should get all repositories from favorites', async () => {
		await fetchAllRepositories(app, userData.token!);
	}, 3000);

	it('should delete a repository from favorites', async () => {
		await deleteRepository(app, userData.token!, testRepo.id!);
	}, 3000);

	// test delete user based on token
	it('should delete current user', async () => {
		await deleteUser(app, userData.token!);
	}, 3000);
});
