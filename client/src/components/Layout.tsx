import React, { FC, ReactNode, useContext } from "react";
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
		<>
			<div style={{ ...theme.mixins.toolbar }}>
				{loggedIn && <Navbar />}
			</div>
			<div
				style={{
					marginLeft: !loggedIn ? 0 : isDrawerOpen ? "240px" : "63px",
				}}
			>
				{children}
			</div>
		</>
	);
};

export default Layout;
