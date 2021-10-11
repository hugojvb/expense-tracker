import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

// APP IMPORT
import App from "./App";

// CONTEXT PROVIDER
import State from "./context/state";

// RENDER REACT DOM
ReactDOM.render(
	<React.StrictMode>
		<State>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</State>
	</React.StrictMode>,
	document.getElementById("root")
);
