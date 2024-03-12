import mongoose from 'mongoose';
import {Repository} from '../../database/types/DBTypes';

const favModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
	},
	url: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	node_id: {
		type: String,
		required: true,
	},
	updated_at: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export const favoriteModel = mongoose.model<Repository>('Favorite', favModel);
