import {Request} from 'express';
import fetchData from './fetchData';
import {LoginUser, TokenContent} from '../database/types/DBTypes';
import {UserResponse} from '../database/types/MessageTypes';
import {MyContext} from '../database/types/MyContext';
import {Octokit} from 'octokit';

export default async (req: Request): Promise<MyContext> => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		try {
			const token = authHeader.split(' ')[1];
			if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');
			//console.log('token from 4-5 server: ', token);
			const user = await fetchData<UserResponse>(
				`${process.env.REACT_APP_AUTH_URL}/users/token`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (!user) {
				return {};
			}
			// add token to user object, so we can use it in resolvers
			const tokenContent: TokenContent = {
				token: token,
				user: user.user as LoginUser,
			};

			// console.log('user from token', userdata);
			return {userdata: tokenContent};
		} catch (error) {
			return {};
		}
	}
	return {};
};
