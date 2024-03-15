import {User, UserInput, Repository} from '../../database/types/DBTypes';
import {MyContext} from '../../database/types/MyContext';
import fetchData from '../../auth-functions/fetchData';
import {LoginResponse, UserResponse} from '../../database/types/MessageTypes';
import {isAdmin, isLoggedIn} from '../../auth-functions/authorize';
import {favoriteModel} from '../model/favoriteModel';

export default {

	FavoriteRepository: {
		owner: async (parent: Repository) => {
			return await fetchData<User>(`${process.env.REACT_APP_AUTH_URL}/users/` + parent.user);
		},
	},
	Query: {
		users: async () => {
			return await fetchData<User[]>(`${process.env.REACT_APP_AUTH_URL}/users`);
		},
		userById: async (_parent: undefined, args: {id: string}) => {
			console.log('args', args.id);
			return await fetchData<User>(`${process.env.REACT_APP_AUTH_URL}/users/` + args.id);
		},
		checkToken: async (_parent: undefined, args: NonNullable<unknown>, context: MyContext) => {
			return await fetchData<UserResponse>(
				`${process.env.REACT_APP_AUTH_URL}/users/token`,
				{
					headers: {
						Authorization: `Bearer ${context.userdata?.token}`,
					},
				},
			);
		},
	},
	Mutation: {
		register: async (_parent:undefined ,args: {user: UserInput}) => {
			return await fetchData<UserResponse>(`${process.env.REACT_APP_AUTH_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(args.user),
			});
		},
		login: async (
			_parent: undefined,
			args: {credentials: {username: string; password: string}},
		) => {
			return await fetchData<LoginResponse>(
				`${process.env.REACT_APP_AUTH_URL}/auth/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(args.credentials),
				},
			);
		},
		updateUser: async (
			_parent: undefined,
			args: {user: UserInput},
			context: MyContext,
		) => {
			isLoggedIn(context);
			return await fetchData<UserResponse>(`${process.env.REACT_APP_AUTH_URL}/users`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${context.userdata?.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(args.user),
			});
		},
		updateUserAsAdmin: async (
			_parent: undefined,
			args: {user: UserInput; id: string},
			context: MyContext,
		) => {
			isLoggedIn(context);
			return await fetchData<UserResponse>(
				`${process.env.REACT_APP_AUTH_URL}/users/` + args.id,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${context.userdata?.token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(args.user),
				},
			);
		},
		deleteUser: async (_parent: undefined, args: NonNullable<unknown>, context: MyContext) => {
			isLoggedIn(context);
			const favorites = await favoriteModel.find({user: context.userdata?.user._id});
			if (favorites.length > 0) {
				await favoriteModel.deleteMany({user: context.userdata?.user._id});
			}
			return await fetchData<UserResponse>(`${process.env.REACT_APP_AUTH_URL}/users`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${context.userdata?.token}`,
				},
			});
		},
		deleteUserAsAdmin: async (
			_parent: undefined,
			args: {id: string},
			context: MyContext,
		) => {
			isAdmin(context);
			return await fetchData<UserResponse>(
				`${process.env.REACT_APP_AUTH_URL}/users/` + args.id,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${context.userdata?.token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({id: args.id}),
				},
			);
		},
	},
};
