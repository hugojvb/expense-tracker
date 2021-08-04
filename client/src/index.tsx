import React from "react";
import ReactDOM from "react-dom";

// APP IMPORT
import App from "./App";

// CONTEXT PROVIDER
import State from "./context/state";

// RENDER REACTDOM
ReactDOM.render(
	<React.StrictMode>
		<State>
			<App />
		</State>
	</React.StrictMode>,
	document.getElementById("root")
);
