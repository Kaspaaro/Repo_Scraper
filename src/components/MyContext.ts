import {createContext} from 'react';
const context = {
	isOpen: false,
	handleOpen: (modeboolean:boolean) => {},
	mode: false,
};
const searchBarContext = {
	result: [],
};
export const SearchBarContext = createContext(searchBarContext);
export const Context = createContext(context);