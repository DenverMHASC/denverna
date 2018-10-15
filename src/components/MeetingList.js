
import React from "react"
import { capitalize, map, sortBy, mapValues } from 'lodash'
import axios from 'axios-jsonp-pro'
import { bmltResponseToMeetingData } from '../bmltToMeetingListData'

import {
	Table, TableHead, TableRow, TableCell, TableBody, Typography
} from '@material-ui/core'

class MeetingList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			meetings: {}
		}
	}

	componentWillMount() {
		// Waiting for the bmlt root server version to be updated.
		axios.jsonp('https://nacolorado.org/meetingList/main_server/client_interface/jsonp/?services[]=2&switcher=GetSearchResults')
			.then(r => bmltResponseToMeetingData(r))
			.then(meetingListData => mapValues(meetingListData, (meetingsByDay, k) => {
				return sortBy(meetingsByDay, ['sortStartTime', 'name'])
			}))
			.then(meetingListData => this.setState({ meetings: meetingListData }))
	}

	render() {
		if (!Object.keys(this.state.meetings).length) {
			return <h4>Loading...</h4>
		}
		return (
			<div className="container">
				<Header />
				<DayAnchors days={Object.keys(this.state.meetings)} />
				{map(this.state.meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
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
};

const Header = () => (
	<table>
		<tbody>
			<tr>
				<td rowSpan="3" style={{ paddingTop: '22px' }} bgcolor="#575758">
					<a href="index.html">
						<img src="img/nalogo.gif" alt="NA" />
					</a>
				</td>
			</tr>
		</tbody>
	</table>
)


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
	return <Typography variant='subtitle2'><a name={day} />{capitalize(day)}</Typography>
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


const MeetingListKey = () => {
	const key = {
		'B': 'Beginners Meeting',
		'BK': 'Book Study',
		'C': 'Closed Meeting for Addicts Only',
		'CL': 'Candlelight',
		'CW': 'Children Welcome/Child Care',
		'D': 'Discussion',
		'ME': 'Meditation',
		'O': 'Open Meeting all are welcome',
		'RF': 'Rotating Format',
		'SD': 'Speaker/Discussion',
		'SG': 'Step Working Guide',
		'So': 'Speaker Only',
		'St': 'Step',
		'SW': 'Step Writing',
		'Tr': 'Tradition',
		'W': 'Women only',
		'WC': 'Wheelchair Accessible',
		'YP': 'Young People',
	}

	return (
		<Table style={{ width: '260px' }}>
			<thead>
				<tr>
					<th>Key</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{map(key, (v, k) => (
					<tr key={k}>
						<td>{k}</td>
						<td>{v}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

const RequestChangeFormLink = () => (
	<div className="pull-right">
		<a target="_blank" href="https://goo.gl/forms/l39LqMIAczxXDXWj1">Request Meeting List Updates</a>
	</div>
)

export default MeetingList