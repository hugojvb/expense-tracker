import { Fragment } from "react";

import "./App.css";

import Routing from "./Routing";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

function App() {
	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routing />
			</ThemeProvider>
		</Fragment>
	);
}

export default App;
