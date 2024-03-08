import mongoose from 'mongoose';
import {Repository} from '../../database/types/DBTypes';

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
	node_id: {
		type: String,
		required: true,
		unique: true
	},
	updated_at: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export const favoriteModel = mongoose.model<Repository>('Favorite', favModel);
