// MATERIAL-UI IMPORTS
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

// THEME CREATION
const theme: Theme = createMuiTheme({
	palette: {
		primary: {
			main: "#010D70",
		},
		secondary: {
			main: "#005cb9",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#eee",
		},
		text: {
			primary: "#222",
			secondary: "#888",
		},
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
	},
});

export default theme;
