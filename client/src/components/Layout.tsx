import React, { ComponentType, useContext } from "react";
import { RouteComponentProps } from "react-router";
import Context from "../context/context";

const Layout = <T extends {}>(
	Component: ComponentType<T & RouteComponentProps>
) => {
	return (props: T & RouteComponentProps) => {
		return (
			<div>
				<Component {...props} />
			</div>
		);
	};
};

export default Layout;
