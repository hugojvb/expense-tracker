import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#010D70",
		},
		secondary: {
			main: "#5658E9",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
	typography: {
		fontFamily: "arial",
	},
});

export default theme;
