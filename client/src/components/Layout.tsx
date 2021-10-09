import React, { ComponentType, FC, ReactElement, useContext } from "react";
import { RouteComponentProps } from "react-router";
import Context from "../context/context";

interface LayoutProps {}

function Layout<T>(Component: ComponentType<T & RouteComponentProps>) {
	const context = useContext(Context);
	const { isDrawerOpen } = context;

	return (props: T & RouteComponentProps) => {
		return (
			<div style={{ marginLeft: isDrawerOpen ? 240 : 40 }}>
				<Component {...props} />
			</div>
		);
	};
}

export default Layout;
