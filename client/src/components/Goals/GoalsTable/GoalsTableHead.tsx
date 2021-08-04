import { FC } from "react";
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

interface Props {
	classes: any;
	onSelectAllClick: any;
	order: any;
	orderBy: any;
	numSelected: number;
	rowCount: any;
	onRequestSort: any;
}

const GoalsTableHead: FC<Props> = ({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
	const createSortHandler = (property: any) => (event: any) => {
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
};

export default GoalsTableHead;
