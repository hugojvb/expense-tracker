import { useState, Fragment, FC } from "react";

import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Checkbox,
	Typography,
} from "@material-ui/core";
import dayjs from "dayjs";

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

interface Props {
	row: any;
	isItemSelected: boolean;
	labelId: any;
	handleClick: any;
}

const HistoryTableRow: FC<Props> = ({
	row,
	isItemSelected,
	labelId,
	handleClick,
}) => {
	const [openDetails, setOpenDetails] = useState(false);
	const classes = useRowStyles();

	return (
		<Fragment>
			<TableRow
				hover
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				key={row.name}
				selected={isItemSelected}
			>
				<TableCell padding="checkbox">
					<Checkbox
						checked={isItemSelected}
						onClick={(event) => handleClick(event, row)}
						inputProps={{ "aria-labelledby": labelId }}
						color="primary"
					/>
				</TableCell>

				<TableCell
					onClick={() => setOpenDetails(!openDetails)}
					align="left"
				>
					{row.name}
				</TableCell>
				<TableCell
					onClick={() => setOpenDetails(!openDetails)}
					align="left"
				>
					{row.amount} €
				</TableCell>
				<TableCell
					onClick={() => setOpenDetails(!openDetails)}
					align="left"
				>
					{dayjs(row.date).format("DD-MM-YYYY")}
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default HistoryTableRow;
