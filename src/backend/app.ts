import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import resolvers from './api/resolvers/index';
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {notFound, errorHandler} from './middlewares';
// import {createRateLimitRule} from 'graphql-rate-limit';
// import {shield} from 'graphql-shield';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {applyMiddleware} from 'graphql-middleware';
import {MyContext} from './database/types/MyContext';
import authenticate from './auth-functions/authenticate';
import typeDefs from './api/schemas/index';
//import {GraphQLError} from 'graphql';

const app = express();

app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: false,
	}),
);

(async () => {
	try {
		const schema = applyMiddleware(
			makeExecutableSchema({
				typeDefs,
				resolvers,
			}),
		);

		const server = new ApolloServer<MyContext>({
			schema,
			introspection: true,
			plugins: [
				process.env.NODE_ENV === 'production'
					? ApolloServerPluginLandingPageProductionDefault({
						embed: true as false,
					})
					: ApolloServerPluginLandingPageLocalDefault(),
			],
			includeStacktraceInErrorResponses: false,
		});
		await server.start();

		app.use(
			'/graphql',
			cors<cors.CorsRequest>(),
			express.json(),
			expressMiddleware(server, {
				context: async ({req}) => authenticate(req),
			}),
		);

		app.use(notFound);
		app.use(errorHandler);
	} catch (error) {
		console.log(error);
	}
})();

export default app;
