import { Box } from "@material-ui/core";
import React, { FC, Fragment, ReactNode, useContext } from "react";
import Context from "../context/context";
import useDrawerState from "../hooks/useDrawerState";
import theme from "../theme";
import Navbar from "./Navbar";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	const { isDrawerOpen } = useDrawerState();

	const context = useContext(Context);

	const { loggedIn } = context;

	return (
		<Fragment>
			<Box style={{ ...theme.mixins.toolbar }}>
				{loggedIn && <Navbar />}
			</Box>
			<Box
				style={{
					marginLeft: !loggedIn ? 0 : isDrawerOpen ? "240px" : "63px",
					marginTop: "40px",
				}}
			>
				{children}
			</Box>
		</Fragment>
	);
};

export default Layout;
