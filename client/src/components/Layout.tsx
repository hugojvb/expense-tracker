import React, { ComponentType, FC, ReactNode, useContext } from "react";
import { RouteComponentProps } from "react-router";
import Context from "../context/context";
import useDrawerState from "../hooks/useDrawerState";
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
			{loggedIn && <Navbar />}
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
