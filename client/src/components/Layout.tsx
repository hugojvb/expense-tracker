import React, { FC, useContext } from "react";
import Context from "../context/context";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
	const context = useContext(Context);
	const { isDrawerOpen } = context;

	return (
		<div style={{ marginLeft: isDrawerOpen ? 240 : 40 }}>{children}</div>
	);
};

export default Layout;
