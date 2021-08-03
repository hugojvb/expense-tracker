import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from "@material-ui/core";

const headCells = [
	{ id: "customID", numeric: false, disablePadding: false, label: "Custom ID" },
	{ id: "name", numeric: false, disablePadding: false, label: "Name" },
	{ id: "subdomain", numeric: false, disablePadding: false, label: "Subdomain" },
	{ id: "maxUsers", numeric: false, disablePadding: false, label: "Max Users" },
	{ id: "creationDate", numeric: false, disablePadding: false, label: "Creation Date" },
	{ id: "expirationDate", numeric: false, disablePadding: false, label: "Expiration Date" },
	{ id: "isEnabled", numeric: false, disablePadding: true, label: "Enabled" },
];

export default function HistoryTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
						color="primary"
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "center" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

HistoryTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};
