import React from "react"
import { map } from 'lodash'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'
import DayLabel from './DayLabel'
import moment from 'moment'

const MeetingListLg = (props) => {
	const { meetings } = props
	return (
		<div className="container">
			{map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
		</div>
	)
}

const meetingListTableStyles = {
	time: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '15%'
	},
	name: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '20%'
	},
	closed: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '10%'
	},
	type: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '10%'
	},
	details: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '20%'
	},
	directions: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '20%'
	},
}

const MeetingListTable = withStyles(meetingListTableStyles)(({ day, meetings, classes }) => {
	return (
		<React.Fragment>
			<DayLabel day={day} />
			<Paper>
				<Table padding='dense'>
					<TableHead>
						<TableRow className={classes.tableHeader}>
							<TableCell className={classes.time}>Time</TableCell>
							<TableCell className={classes.name}>Name</TableCell>
							<TableCell className={classes.closed}>Facility Closed</TableCell>
							<TableCell className={classes.type}>Type</TableCell>
							<TableCell className={classes.details}>Details</TableCell>
							<TableCell className={classes.directions}>Directions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
					</TableBody>
				</Table>
			</Paper>
		</React.Fragment>
	)
})

const rowStyles = {
	cell: {
		fontSize: '16px'
	}
}

const MeetingRow = withStyles(rowStyles)(({ meetingtime, meetingname, type, closed, phonenumber, code, link, classes, directions }) => {
	return (
		<TableRow>
			<TableCell className={classes.cell}>{moment(meetingtime, 'hh:mm:ss').format('h:mm A')}</TableCell>
			<TableCell className={classes.cell}>{meetingname}</TableCell>
			<TableCell className={classes.cell}>{closed}</TableCell>
			<TableCell className={classes.cell}>{type}</TableCell>
			{renderDetails(classes, type, phonenumber, code, link, directions)}
			<TableCell className={classes.cell}>{directions}</TableCell>
		</TableRow>
	)
})

const renderDetails = (classes, type, phonenumber, code, link, directions) => {
	switch (type) {
		case 'Zoom':
			return <TableCell className={classes.cell}><a href={link}>{link}</a> {phonenumber ? <a href={'tel:' + phonenumber}>{phonenumber}</a> + 'Code: ' + { code } : null}</TableCell>
		case 'Phone':
			return <TableCell className={classes.cell}><a href={'tel:' + phonenumber}>{phonenumber}</a> Code: {code}</TableCell>
		case 'Park':
			return <TableCell className={classes.cell}>{}</TableCell>
		default:
			return <TableCell className={classes.cell}>{phonenumber} {code} {link}</TableCell>
	}
}

export default MeetingListLg
