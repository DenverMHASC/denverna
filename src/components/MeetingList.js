import React from "react"
import { capitalize, map } from 'lodash'
import {
	Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper
} from '@material-ui/core'

import MeetingListKey from '../components/MeetingListKey'

import bmltInject from '../bmltInject'

const MeetingList = (props) => {
	const { meetings } = props
	if (!Object.keys(meetings).length) {
		return <h4>Loading...</h4>
	}
	return (
		<div className="container">
			<DayAnchors days={Object.keys(meetings)} />
			{map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
			<RequestChangeFormLink />
			<MeetingListKey />
			<div>
				<p>
					"NA has no opinion on outside issues; hence the NA name ought never be drawn into public controversy."
            <br />
					Tradition 10
            <br />
					<br />
					Narcotics Anonymous is NOT affiliated with any outside organizations or
					enterprises, and has no connection whatsoever to the locations where
					N.A. meetings are held including but not limited to: religious or
					political organizations, hospitals, institutions, treatment programs,
					correctional facilities,private clubs and/or individual enterprises.
         	</p>
			</div>
		</div>
	)
}

const Address = ({ street, unit, city, zip, notes }) => {
	notes = notes && `(${notes})`
	street = unit ? street : `${street},`
	unit = unit && `${unit},`
	return (
		<span>{street} {unit} {city} {zip} {notes}</span>
	)
}

const generateGoogleMapsLinkFromAddress = ({ street, city, zip }) => {
	return `https://www.google.com/maps/place/${street.replace(/\W/g, '+')},+${city},+CO+${zip}`
}

const MeetingRow = ({ time, name, format, address }) => {
	return (
		<TableRow>
			<TableCell>{time}</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>
				<a target="_new" href={generateGoogleMapsLinkFromAddress(address)}><Address {...address} /></a>
			</TableCell>
			<TableCell><span>{format.join(', ')}</span></TableCell>
		</TableRow>
	)
}

const DayLabel = ({ day }) => {
	return <Typography variant='h6' style={{ margin: '4px' }}><a name={day} />{capitalize(day)}</Typography>
}

const DayAnchors = ({ days }) => {
	return (
		<span style={{ fontSize: '20px', marginTop: '10px' }}>{days.map((d, ix) => <span key={ix}> {ix ? "|" : ''} <a href={`#${d}`}> {capitalize(d)}</a></span>)}</span>
	)
}

const MeetingListTable = ({ day, meetings }) => {
	return (
		<div>
			<DayLabel day={day} />
			<Table >
				<TableHead>
					<TableRow>
						<TableCell>Time</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
				</TableBody>
			</Table >
		</div>
	)
}




const RequestChangeFormLink = () => (
	<div className="pull-right">
		<a target="_blank" href="https://goo.gl/forms/l39LqMIAczxXDXWj1">Request Meeting List Updates</a>
	</div>
)

export default bmltInject(MeetingList)