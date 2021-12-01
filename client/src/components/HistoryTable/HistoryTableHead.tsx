import { FC } from "react";
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from "@material-ui/core";

const headCells: { id: string; label: string }[] = [
	{
		id: "transaction",
		label: "Transaction",
	},
	{ id: "amount", label: "Amount" },
	{ id: "date", label: "Date" },
];

interface Props {
	classes: any;
	onSelectAllClick: any;
	order: any;
	orderBy: string;
	numSelected: number;
	rowCount: any;
	onRequestSort: any;
}

const HistoryTableHead: FC<Props> = ({
	classes,
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
}) => {
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
						color="primary"
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="left"
						sortDirection={orderBy === headCell.id ? order : false}
						width={100 / headCells.length + "%"}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default HistoryTableHead;
