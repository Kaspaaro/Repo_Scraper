import mongoose from 'mongoose';
import {Favorite} from '../../database/types/DBTypes';

const favModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
		unique:false,
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

export const favoriteModel = mongoose.model<Favorite>('Favorite', favModel);
