import React, { useContext } from "react";
import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Paper,
} from "@material-ui/core";

import GoalsTableHead from "./GoalsTableHead";
import GoalsTableToolbar from "./GoalsTableToolbar";
import GoalsTableRow from "./GoalsTableRow";

import Context from "../../context/context";

function createData(id: number, goal: number, date: string) {
	return {
		id,
		goal,
		date,
	};
}

// sorting
function descendingComparator(a: any, b: any, orderBy: any) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order: string, orderBy: any) {
	return order === "desc"
		? (a: any, b: any) => descendingComparator(a, b, orderBy)
		: (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
	const stabilizedThis = array.map((el: any, index: any) => [el, index]);
	stabilizedThis.sort((a: any, b: any) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el: any) => el[0]);
}

// styles
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

export default function DemoTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState<any>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [search, setSearch] = React.useState("");
	const [filtered, setFiltered] = React.useState();

	const context = useContext(Context);
	const { getData, goals, loading } = context;

	React.useEffect(() => {
		(async () => {
			if (goals.length === 0) await getData("Goals");
		})();
	}, []);

	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// select
	const handleSelectAllClick = (event: any) => {
		if (event.target.checked) {
			const newSelecteds: any = goals.map((n: any) => n._id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: any, row: any) => {
		const selectedIndex = selected.indexOf(row._id);
		let newSelected: any = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, row._id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	// pagination
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (_id: any) => selected.indexOf(_id) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, goals.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<GoalsTableToolbar
					numSelected={selected.length}
					search={search}
					setSearch={setSearch}
					rows={goals}
					setFiltered={setFiltered}
					selected={selected}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<GoalsTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={goals.length}
						/>
						<TableBody>
							{loading ? (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={10}>
										<div
											className="container"
											style={{
												width: "100%",
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<img
												src="../../loading.svg"
												alt="loading"
												style={{ width: 100 }}
											/>
										</div>
									</TableCell>
								</TableRow>
							) : (
								stableSort(
									filtered ? filtered : goals,
									getComparator(order, orderBy)
								)
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row: any, index: any) => {
										const isItemSelected = isSelected(
											row._id
										);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<GoalsTableRow
												key={row._id}
												row={row}
												labelId={labelId}
												isItemSelected={isItemSelected}
												handleClick={handleClick}
											/>
										);
									})
							)}
							{emptyRows > 0 && !loading && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={10} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={goals.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
