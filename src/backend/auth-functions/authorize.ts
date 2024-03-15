import {GraphQLError} from 'graphql';
import {MyContext} from '../database/types/MyContext';

const isLoggedIn = (ctx: MyContext) => {
	if (!ctx.userdata) {
		throw new GraphQLError('Not authorized', {
			extensions: {
				code: 'UNAUTHORISED',
				http: {
					status: 401,
				},
			},
		});
	}
};

const isAdmin = (ctx: MyContext) => {
	isLoggedIn(ctx);
	if (ctx.userdata && ctx.userdata.user.role !== 'admin') {
		throw new GraphQLError('Not authorized', {
			extensions: {
				code: 'UNAUTHORISED',
				http: {
					status: 401,
				},
			},
		});
	}
};


export {isLoggedIn, isAdmin};
