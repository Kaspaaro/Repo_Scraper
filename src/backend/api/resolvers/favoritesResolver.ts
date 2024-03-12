import {favoriteModel} from '../model/favoriteModel';
import {RepositoryInput} from '../../database/types/DBTypes';
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
		favorites: async (_parent: undefined, args: {user: string}, context:MyContext) => {
			isLoggedIn(context);
			const favorites= await favoriteModel.find({user: context.userdata?.user._id});
			if (favorites.length > 0) {
				const ids = favorites.map((fav) => fav.node_id);
				const repos = await getRepositoriesByIds(ids);
				console.log('repos', repos);
				let index = 0;
				repos?.map(async (repo) => {
					const date_repo = new Date(repo.updatedAt);
					const date_fav = new Date(favorites[index].updated_at);
					if (date_repo > date_fav) {
						try {
							console.log('repository has been updated recently ', repo);
							await favoriteModel.findOneAndUpdate({node_id: repo.id}, {updated_at: date_repo}, {new: true});
						}catch (e) {
							console.log('An error occurred while updating a favorite repo', e);
						}
					}
					index++;
				});
			}
			return favorites;
		},
		test: async (_parent: undefined, args: {input: string}, context: MyContext) => {
			//await getRateLimit();
			// const repos = await getRepositoriesByIds(['MDEwOlJlcG9zaXRvcnkx']);
			// console.log('repos', repos);
		}

	},
	Mutation: {
		addRepository: async (_parent: undefined, args: {input: RepositoryInput}, context: MyContext) => {
			isLoggedIn(context);
			return await favoriteModel.create({...args.input, user: context.userdata?.user._id});

		},
		removeRepository: async (_parent: undefined, args: {id: string}, context: MyContext) => {
			isLoggedIn(context);
			return favoriteModel.findOneAndDelete({_id: args.id, user: context.userdata?.user._id});
		},
	}
};
