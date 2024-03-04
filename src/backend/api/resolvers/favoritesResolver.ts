import {favoriteModel} from '../model/favoriteModel';
import {InputFavorite} from '../../database/types/DBTypes';
import {isLoggedIn} from '../../auth-functions/authorize';
import {MyContext} from '../../database/types/MyContext';


export default {
	Query: {
		favorites: async (_parent: undefined, args: {user: string}, context:MyContext) => {
			isLoggedIn(context);
			return favoriteModel.find({user: context.userdata?.user._id});
		}
	},
	Mutation: {
		addToFavorites: async (_parent: undefined, args: {input: InputFavorite}, context: MyContext) => {
			isLoggedIn(context);
			return await favoriteModel.create({...args.input, user: context.userdata?.user._id});
		},
		removeFromFavorites: async (_parent: undefined, args: {id: string}, context: MyContext) => {
			isLoggedIn(context);
			return favoriteModel.findOneAndDelete({_id: args.id, user: context.userdata?.user._id});
		}
	}
};
