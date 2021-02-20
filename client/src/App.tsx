import { Fragment } from "react";

import "./App.css";

import Navbar from "./components/Navbar";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

function App() {
	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<Navbar />
				<CssBaseline />
			</ThemeProvider>
		</Fragment>
	);
}

export default App;
