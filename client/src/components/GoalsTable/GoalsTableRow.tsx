import { useState, Fragment, FC } from "react";

import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Checkbox,
	Box,
	Collapse,
	TableHead,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import dayjs from "dayjs";

const useRowStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	row: {
		"&:nth-of-type(2n + 1)": {
			backgroundColor: "#efefef",
		},
	},
}));

interface Props {
	row: any;
	isItemSelected: boolean;
	labelId: any;
	handleClick: any;
}

const GoalsTableRow: FC<Props> = ({
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
				onClick={(event) => handleClick(event, row)}
				selected={isItemSelected}
				className={classes.row}
			>
				<TableCell padding="checkbox">
					<Checkbox
						checked={isItemSelected}
						inputProps={{ "aria-labelledby": labelId }}
						color="primary"
					/>
				</TableCell>

				<TableCell
					onClick={() => setOpenDetails(!openDetails)}
					align="left"
				>
					{row.goal} €
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

export default GoalsTableRow;
