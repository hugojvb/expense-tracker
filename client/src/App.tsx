// ROUTING IMPORT
import Routing from "./Routing";

// MATERIAL-UI IMPORTS
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

// FUNCTIONAL COMPONENT
const App = (): JSX.Element => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routing />
			</ThemeProvider>
		</>
	);
};

export default App;
