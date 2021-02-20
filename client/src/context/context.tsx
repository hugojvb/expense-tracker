import { createContext } from "react";

type ContextProps = {
	loggedIn: boolean;
	login: () => void;
	logout: () => void;
};

const context = createContext<Partial<ContextProps>>({});

export default context;
