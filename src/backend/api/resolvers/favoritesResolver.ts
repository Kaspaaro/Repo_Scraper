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
		 *
		 * Fetches the favorite repositories of the user from the database.
		 * If the user is logged in then it will return the favorite repositories of the user,
		 * and if the count of the favorite repositories is greater than 0, then it will fetch the repositories from the github api
		 * and compare the updated_at date of the favorite repository with the updated_at date of the repository from the github api.
		 * If the repository has been updated recently then it will update the updated_at date of the favorite repository in the database and
		 * returns the data of favorite repos of the user to usable in ui.
		 */
		favorites: async (_parent: undefined,args:{user:string}, context:MyContext) => {
			isLoggedIn(context);
			const favorites= await favoriteModel.find({user: context.userdata?.user._id});
			if (favorites.length > 0) {
				return favorites;
			}
			return new GraphQLError('No favorite repositories were found');
		},
		test: async (_parent: undefined, args: {input: string}, context: MyContext) => {
			// const repos2 = await getRepositoriesByName('Web');
			// const nodes = repos2.map((edge) => edge.node);
			console.log('Rate limit left', await getRateLimit());
		}

	},
	Mutation: {
		addRepository: async (_parent: undefined, args: {input: RepositoryInput}, context: MyContext) => {
			isLoggedIn(context);
			const repos = await favoriteModel.find({user: context.userdata?.user._id});
			if (repos.length >= 10) {
				throw new GraphQLError('You can only add 10 repositories to your favorites');
			}
			return favoriteModel.create({...args.input, user: context.userdata?.user._id});
		},
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
