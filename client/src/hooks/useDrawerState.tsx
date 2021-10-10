import React, { useContext } from "react";
import Context from "../context/context";

const useDrawerState = () => {
	const context = useContext(Context);
	const { isDrawerOpen } = context;

	return { isDrawerOpen };
};

export default useDrawerState;
