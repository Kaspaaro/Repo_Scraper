import {createContext} from 'react';
const context = {
	isOpen: false,
	handleOpen: (modeboolean:boolean) => {},
	mode: false,
};
export const Context = createContext(context);