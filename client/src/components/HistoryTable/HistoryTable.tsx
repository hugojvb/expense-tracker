import React from "react";
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

import HistoryTableHead from "./HistoryTableHead";
import HistoryTableToolbar from "./HistoryTableToolbar";

import DemoRow from "./HistoryTableRow";

import axios from "axios";

function createData(
	id: number,
	transaction: string,
	amount: number,
	date: string
) {
	return {
		id,
		transaction,
		amount,
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

const HistoryTable = () => {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState<any>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [search, setSearch] = React.useState("");
	const [rows, setRows] = React.useState([
		createData(123, "Compras", 23.32, "2021-4-22"),
	]);
	const [filtered, setFiltered] = React.useState();

	React.useEffect(() => {
		(async () => {
			await axios.get("/api/transactions");
		})();
	});

	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// select
	const handleSelectAllClick = (event: any) => {
		if (event.target.checked) {
			const newSelecteds: any = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: any, row: any) => {
		const selectedIndex = selected.indexOf(row.name);
		let newSelected: any = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, row.name);
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

	const isSelected = (name: any) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<HistoryTableToolbar
					numSelected={selected.length}
					search={search}
					setSearch={setSearch}
					rows={rows}
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
						<HistoryTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(
								filtered ? filtered : rows,
								getComparator(order, orderBy)
							)
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row: any, index: any) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<DemoRow
											key={row.name}
											row={row}
											labelId={labelId}
											isItemSelected={isItemSelected}
											handleClick={handleClick}
										/>
									);
								})}
							{emptyRows > 0 && (
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default HistoryTable;
