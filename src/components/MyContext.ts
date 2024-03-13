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
export const RepoCardContext = createContext(repoCardContext);
export const SearchBarContext = createContext(searchBarContext);
export const Context = createContext(context);