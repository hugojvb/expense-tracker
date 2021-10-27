// CREATE CONTEXT IMPORT
import { createContext } from "react";

// PROPS INTERFACE
interface ContextProps {
	loggedIn: boolean;
	login: () => void;
	logout: () => void;
	isDrawerOpen: boolean;
	toggleDrawer: (arg0: boolean) => void;
	transactions: any;
	goals: any;
	getData: (data: string) => void;
	loading: boolean;
}

// CREATE CONTEXT STORE
const context = createContext({} as ContextProps);

export default context;
