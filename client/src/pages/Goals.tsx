import { Fragment, useContext } from "react";

import GoalsTable from "../components/GoalsTable/GoalsTable";

import { makeStyles, createStyles, Container } from "@material-ui/core";

import Context from "../context/context";

const useStyles = makeStyles((theme) => createStyles({}));

export default function Goals() {
	const classes = useStyles();

	const context = useContext(Context);

	return (
		<Container fixed style={{ minWidth: "100%" }}>
			<GoalsTable />
		</Container>
	);
}
