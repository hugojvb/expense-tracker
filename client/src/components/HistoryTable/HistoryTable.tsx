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

import HistoryTableHead from "./HistoryTableHead";
import HistoryTableToolbar from "./HistoryTableToolbar";

import HistoryTableRow from "./HistoryTableRow";

import Context from "../../context/context";

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
	const [filtered, setFiltered] = React.useState<any[]>();

	const context = useContext(Context);
	const { getData, transactions, loading, setLoading } = context;

	React.useEffect(() => {
		(async () => {
			if (transactions.length === 0) {
				setLoading(true);
				await getData("Transactions");
				setLoading(false);
			}
		})();
	}, [getData, transactions, setLoading]);

	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// select
	const handleSelectAllClick = (event: any) => {
		if (event.target.checked) {
			const newSelecteds: any = transactions.map((n: any) => n?._id);
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
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<HistoryTableToolbar
					numSelected={selected.length}
					search={search}
					setSearch={setSearch}
					rows={transactions}
					setFiltered={setFiltered}
					selected={selected}
					setSelected={setSelected}
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
							rowCount={transactions.length}
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
											<img src="../../loading.svg" alt="loading" style={{ width: 100 }} />
										</div>
									</TableCell>
								</TableRow>
							) : (
								stableSort(filtered ? filtered : transactions, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row: any, index: any) => {
										const isItemSelected = isSelected(row._id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<HistoryTableRow
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
					count={filtered ? filtered.length : transactions.length}
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
