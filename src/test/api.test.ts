/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import {LoginResponse} from '../backend/database/types/MessageTypes';
import {UserTest} from '../backend/database/types/DBTypes';
import randomstring from 'randomstring';
import app from '../backend/app';
import {deleteUser, loginUser, postUser} from './userTestFuntions';
describe('Test GraphQL API', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL as string);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	let userData: LoginResponse;

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
	});

	// test delete user based on token
	it('should delete current user', async () => {
		await deleteUser(app, userData.token!);
	});
});


