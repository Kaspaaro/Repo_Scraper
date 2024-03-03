import {favoriteModel} from '../model/favoriteModel';
import {InputFavorite} from '../../database/types/DBTypes';
import {isLoggedIn} from '../../auth-functions/authorize';
import {MyContext} from '../../database/types/MyContext';


export default {
	Query: {
		favorites: async (_parent: undefined, args: {user: string}) => {
			return favoriteModel.find({user: args.user});
		}
	},
	Mutation: {
		addToFavorites: async (_parent: undefined, args: {input: InputFavorite}, context: MyContext) => {
			isLoggedIn(context);
			console.log('context', context.userdata?.user._id);
			return await favoriteModel.create({...args.input, user: context.userdata?.user._id});
		}
	}
};
