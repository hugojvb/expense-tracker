// MATERIAL-UI IMPORTS
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
	},
});

export default theme;
