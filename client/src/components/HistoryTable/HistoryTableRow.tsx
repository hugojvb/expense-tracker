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
					{row._id}
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
					{row.date}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{
						paddingBottom: 0,
						paddingTop: 0,
						background: "#eee",
					}}
					colSpan={10}
				>
					<Collapse in={openDetails} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Details
							</Typography>
							<Table size="small" aria-label="details">
								<TableHead>
									<TableRow>
										<TableCell>Custom ID</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Subdomain</TableCell>
										<TableCell>Max Users</TableCell>
										<TableCell>Creation Date</TableCell>
										<TableCell>Expiration Date</TableCell>
										<TableCell>Enabled</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow key={row.name}>
										<TableCell>{row.customID} </TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.subDomain}</TableCell>
										<TableCell>{row.maxUsers} </TableCell>
										<TableCell>
											{row.creationDate}{" "}
										</TableCell>
										<TableCell>
											{row.expirationDate}{" "}
										</TableCell>
										<TableCell>
											{row.isEnabled ? (
												<CheckIcon color="primary" />
											) : (
												<CloseIcon color="secondary" />
											)}{" "}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default HistoryTableRow;
