import React from "react"
import { map } from 'lodash'
import {
	Table, Paper, TableHead,
	TableRow, TableBody, TableCell, Typography,
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
	time: { width: '12%' },
	name: { width: '19%' },
	address: { width: '48%' },
	type: { width: '21%' }
}

const MeetingListTable = withStyles(meetingListTableStyles)(({ day, meetings, classes }) => {
	return (
		<React.Fragment>
			<DayLabel day={day} />
			<Paper>
				<Table padding='dense'>
					<TableHead>
						<TableRow>
							<TableCell className={classes.time}>Time</TableCell>
							<TableCell className={classes.name}>Name</TableCell>
							<TableCell className={classes.address}>Address</TableCell>
							<TableCell className={classes.type}>Type</TableCell>
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

const MeetingRow = ({ time, name, format, address }) => {
	return (
		<TableRow>
			<TableCell>{time}</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>
				<A
					href={generateGoogleMapsLinkFromAddress(address)}
				>
					<Address {...address}
					/>
				</A>
			</TableCell>
			<TableCell><span>{format.join(', ')}</span></TableCell>
		</TableRow>
	)
}

export default MeetingListLg