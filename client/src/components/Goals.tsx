import { FC, Fragment } from "react";

import Navbar from "./Navbar";

import { DataGrid, ColDef, ValueGetterParams } from "@material-ui/data-grid";
import { Container, makeStyles, createStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			justifyContent: "center",
			marginTop: "5vh",
		},
		table: { height: 600, width: "100%" },
	})
);

const columns: ColDef[] = [
	{ field: "amount", headerName: "Amount", width: 450 },
	{ field: "date", headerName: "Date", width: 450 },
];

const rows = [
	{ id: 1, amount: 24, date: "Snow" },
	{ id: 2, amount: 24, date: "Lannister" },
	{ id: 3, amount: 24, date: "Lannister" },
	{ id: 4, amount: 24, date: "Stark" },
	{ id: 5, amount: 24, date: "Targaryen" },
	{ id: 6, amount: 24, date: "Melisandre" },
	{ id: 7, amount: 24, date: "Clifford" },
	{ id: 8, amount: 24, date: "Frances" },
	{ id: 9, amount: 24, date: "Roxie" },
];

const Goals: FC = (): JSX.Element => {
	const classes = useStyles();

	return (
		<Fragment>
			<Navbar />
			<Typography variant="h6">How much you want to spend monthly?</Typography>
			<Container maxWidth="lg" className={classes.container}>
				<div className={classes.table}>
					<DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
				</div>
			</Container>
		</Fragment>
	);
};

export default Goals;
