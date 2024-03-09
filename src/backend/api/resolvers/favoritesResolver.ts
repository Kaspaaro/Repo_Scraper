import {favoriteModel} from '../model/favoriteModel';
import {RepositoryInput,} from '../../database/types/DBTypes';
import {isLoggedIn} from '../../auth-functions/authorize';
import {MyContext} from '../../database/types/MyContext';
import {getRepositoriesByIds, getRepositoriesByUsername} from '../github-queries/queries';

export default {
	Query: {
		favorites: async (_parent: undefined, args: {user: string}, context:MyContext) => {
			isLoggedIn(context);
			const userRepos = await getRepositoriesByUsername('SmuuSka');
			const favorites= await favoriteModel.find({user: context.userdata?.user._id}, 'node_id | updated_at');
			if (favorites.length > 0) {
				const ids = favorites.map((fav) => fav.node_id);
				const repos = await getRepositoriesByIds(ids);
				let index = 0;
				repos.map((repo) => {
					const date_repo = new Date(repo.updatedAt);
					const date_fav = new Date(favorites[index].updated_at);
					if(date_repo > date_fav) {
						console.log('repository has been updated recently ', repo);
					}
					index++;
				});
			}
			return favoriteModel.find({user: context.userdata?.user._id});
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
		updateRepository: async (_parent: undefined, args: {id: string, input: RepositoryInput}, context: MyContext) => {
			isLoggedIn(context);
			return favoriteModel.findOneAndUpdate({_id: args.id, user: context.userdata?.user._id}, args.input, {new: true});
		}
	}
};
