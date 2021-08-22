// CREATE CONTEXT IMPORT
import { createContext } from "react";

// PROPS INTERFACE
interface ContextProps {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

// CREATE CONTEXT STORE
const context = createContext<Partial<ContextProps>>({});

export default context;
