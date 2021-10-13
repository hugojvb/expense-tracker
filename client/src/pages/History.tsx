import { Fragment } from "react";

import HistoryTable from "../components/HistoryTable/HistoryTable";

import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({}));

export default function DemoInstances() {
	const classes = useStyles();

	return (
		<Fragment>
			<HistoryTable />
		</Fragment>
	);
}
