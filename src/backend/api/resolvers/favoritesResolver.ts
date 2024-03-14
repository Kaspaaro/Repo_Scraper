import {favoriteModel} from '../model/favoriteModel';
import {RepositoryInput, Node, UpdatedRepositories} from '../../database/types/DBTypes';
import {isLoggedIn} from '../../auth-functions/authorize';
import {MyContext} from '../../database/types/MyContext';
import {
	getRepositoriesByIds,
	getRepositoriesByName,
	getRepositoriesByUsername,
	getRepositories,
	fetchReadme,
	getRateLimit
} from '../github-queries/queries';
import {GraphQLError} from 'graphql';

export default {
	Query: {
		/**
		 * @param _parent
		 * @param args logged user id
		 * @param context logged user data
		 * @returns the favorite repositories of the logged user
		 * @throws GraphQLError if no favorite repositories were found
		 */
		favorites: async (_parent: undefined, args:{user:string}, context:MyContext) => {
			isLoggedIn(context);
			const favorites= await favoriteModel.find({user: context.userdata?.user._id});
			if (favorites.length > 0) {
				return favorites;
			}
			return new GraphQLError('No favorite repositories were found');
		},
	},
	Mutation: {
		/**
		 * @param _parent
		 * @param args input data
		 * @param context logged user data
		 * @returns the added repository
		 * @throws GraphQLError if the user is not logged in
		 * @throws GraphQLError if the user has already added 10 repositories to his favorites
		 */
		addRepository: async (_parent: undefined, args: {input: RepositoryInput}, context: MyContext) => {
			isLoggedIn(context);
			const repos = await favoriteModel.find({user: context.userdata?.user._id});
			if (repos.length >= 10) {
				throw new GraphQLError('You can only add 10 repositories to your favorites');
			}
			if (repos.map((repo) => repo.node_id).includes(args.input.node_id)) {
				throw new GraphQLError('You have already added this repository to your favorites');
			}
			return favoriteModel.create({...args.input, user: context.userdata?.user._id});
		},

		/**
		 * @param _parent
		 * @param args input data
		 * @param context logged user data
		 * @returns the repository
		 * @throws GraphQLError if the user is not logged in
		 *
		 */
		updateRepositories: async (_parent: undefined, args:{user:string}, context: MyContext) => {
			isLoggedIn(context);
			console.log('Rate limit left upper', await getRateLimit());
			const favorites = await favoriteModel.find({user: context.userdata?.user._id});
			if (favorites.length > 0) {
				const ids = favorites.map((fav) => fav.node_id);
				const repos = await getRepositoriesByIds(ids);
				const updatedRepositories :UpdatedRepositories[] = [];
				console.log('Rate limit left lower', await getRateLimit());
				await Promise.all(repos?.map(async (repo, index) => {
					const date_repo = new Date(repo.updatedAt);
					const date_fav = new Date(favorites[index].updated_at);
					if (date_repo > date_fav) {
						try {
							console.log('repository has been updated recently ', repo);
							const updated:UpdatedRepositories| null = await favoriteModel.findOneAndUpdate({
								node_id: repo.id,
								user: context.userdata?.user._id
							}, {updated_at: date_repo}, {new: true});
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							updatedRepositories.push(updated!);
						} catch (e) {
							console.log('An error occurred while updating a favorite repo', e);
						}
					}
					index++;
				}));
				return updatedRepositories;
			}
			return new GraphQLError('No favorite repositories were found for updating');
		},
		removeRepository: async (_parent: undefined, args: {id: string}, context: MyContext) => {
			isLoggedIn(context);
			return favoriteModel.findOneAndDelete({_id: args.id, user: context.userdata?.user._id});
		},
	}
};
