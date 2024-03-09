import {favoriteModel} from '../model/favoriteModel';
import {RepositoryInput} from '../../database/types/DBTypes';
import {isLoggedIn} from '../../auth-functions/authorize';
import {MyContext} from '../../database/types/MyContext';

export default {
	Query: {
		favorites: async (_parent: undefined, args: {user: string}, context:MyContext) => {
			isLoggedIn(context);
			const favorites = await favoriteModel.find({user: context.userdata?.user._id}, 'name');
			if (favorites.length > 0) {
				console.log('favorites', favorites);
			}
			//const fetchReposFromDB
			//fetch all repositories from github(user repos node_id)

			return favoriteModel.find({user: context.userdata?.user._id});
		}
	},
	Mutation: {
		addRepository: async (_parent: undefined, args: {input: RepositoryInput}, context: MyContext) => {
			isLoggedIn(context);
			const res = await favoriteModel.create({...args.input, user: context.userdata?.user._id});
			console.log('res', res.id);
			return res;
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
