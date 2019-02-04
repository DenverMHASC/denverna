import React from "react"
import { map } from 'lodash'
import {
	Table, Paper, TableHead,
	TableRow, TableBody, TableCell,
	withStyles
} from '@material-ui/core'

import A from './A'
import DayLabel from './DayLabel'
import Address from './Address'
import { generateGoogleMapsLinkFromAddress } from '../utils'

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
		width: '25%'
	},
	address: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '40%'
	},
	type: {
		fontSize: '16px',
		fontWeight: 'bold',
		width: '20%'
	}
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
							<TableCell className={classes.address}>Address</TableCell>
							<TableCell className={classes.type}>Format</TableCell>
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

const MeetingRow = withStyles(rowStyles)(({ time, name, format, address, classes }) => {
	return (
		<TableRow>
			<TableCell className={classes.cell}>{time}</TableCell>
			<TableCell className={classes.cell}>{name}</TableCell>
			<TableCell className={classes.cell}>
				<A
					href={generateGoogleMapsLinkFromAddress(address)}
				>
					<Address {...address}
					/>
				</A>
			</TableCell>
			<TableCell className={classes.cell}><span>{format.join(', ')}</span></TableCell>
		</TableRow>
	)
})

export default MeetingListLg
