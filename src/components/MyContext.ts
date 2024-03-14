import {createContext} from 'react';
import {Node} from '../backend/database/types/DBTypes';
const context = {
	isOpen: false,
	handleOpen: (modeboolean:boolean) => {},
	mode: false,
};
const searchBarContext = {
	result: {},
};
const repoCardContext ={
	clickedFunction: ()=> {},
};
const loginTokenContext = {
	userToken: '',
	setUserToken: (token:string)=>{},
	username:'',
	setUsername: (username:string)=>{},
};
const addToFavoritesContext = {
	click: false,
	setClick: (click:boolean)=>{},
};
const nodeItemContext = {
	owner_Context: '',
	setOwner_Context: (owner_Context:string)=>{},

	node_id_Context: '',
	setNode_id_Context: (node_id:string)=>{},

	name_Context: '',
	setName_Context: (name:string)=>{},

	url_Context: '',
	setUrl_Context: (url:string)=>{},

	updated_at_Context: '',
	setUpdated_at_Context: (updated_at:string)=>{},

};

const loginButtonContext ={
	clickedFunction: async ()=> {},
};

export const RepoCardContext = createContext(repoCardContext);
export const SearchBarContext = createContext(searchBarContext);
export const Context = createContext(context);
export const LoginTokenContext = createContext(loginTokenContext);
export const AddToFavoritesContext = createContext(addToFavoritesContext);
export const NodeItemContext = createContext(nodeItemContext);
export const LoginButtonContext= createContext(loginButtonContext);