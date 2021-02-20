import { createContext } from "react";

type ContextProps = {
	logged_in: boolean;
	login: () => void;
	logout: () => void;
};

const context = createContext<Partial<ContextProps>>({});

export default context;
